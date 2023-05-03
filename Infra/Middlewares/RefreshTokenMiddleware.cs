using System;
using System.Linq;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Lokin_BackEnd.Infra.Middlewares
{
    public class RefreshTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private IRefreshTokenRepository _refreshTokenRepository;

        public RefreshTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;

            context.Request.Headers.TryGetValue("Authorization", out var authorization);
            string? authorizationHeader = authorization.FirstOrDefault();

            if (!string.IsNullOrEmpty(authorizationHeader))
            {
                string token = context.Request.Headers.Authorization.ToString().Split(' ')[1];

                context.Request.Headers.TryGetValue("Refresh-Token", out var values);
                string? refreshTokenHeader = values.FirstOrDefault();

                if (string.IsNullOrEmpty(refreshTokenHeader))
                {
                    context.Request.Headers.Remove("Authorization");
                    await _next(context);
                    return;
                }
                else
                {
                    Guid userId = TokenService.GetUserId(token);
                    var refreshTokenDatabase = _refreshTokenRepository.GetByUserId(userId);
                    if (refreshTokenDatabase?.Value != refreshTokenHeader)
                    {
                        context.Request.Headers.Remove("Authorization");
                        if (refreshTokenDatabase is not null)
                        {
                            await _refreshTokenRepository.DeleteByUserId(userId);
                        }

                        await _next(context);
                        return;
                    }

                    if (TokenService.IsTokenExpired(token))
                    {
                        string newToken = TokenService.GenerateToken(TokenService.GetPrincipalFromExpiredToken(token).Claims);
                        string newRefreshToken = _refreshTokenRepository.GenerateRefreshToken();

                        await _refreshTokenRepository.DeleteByUserId(userId);
                        await _refreshTokenRepository.Create(userId, newRefreshToken);

                        context.Response.Headers.Authorization = "Bearer " + newToken;
                        context.Response.Headers.Add("Refresh-Token", newRefreshToken);

                        context.Request.Headers.Remove("Authorization");
                        context.Request.Headers.Add("Authorization", "Bearer " + newToken);
                    }
                }
            }

            await _next(context);
        }
    }

}