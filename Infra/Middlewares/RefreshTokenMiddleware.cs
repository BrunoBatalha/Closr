using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Lokin_BackEnd.Infra.Middlewares
{
    public class RefreshTokenMiddleware
    {
        private readonly RequestDelegate _next;

        public RefreshTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!string.IsNullOrEmpty(context.Request.Headers.Authorization))
            {
                string token = context.Request.Headers.Authorization.ToString().Split(' ')[1];

                if (TokenService.IsTokenExpired(token))
                {
                    Guid userId = TokenService.GetUserId(token);
                    ClaimsPrincipal? principal = TokenService.GetPrincipalFromExpiredToken(token);

                    string newToken = TokenService.GenerateToken(principal.Claims);
                    string newRefreshToken = TokenService.GenerateRefreshToken();

                    TokenService.DeleteRefreshToken(userId);
                    TokenService.SaveRefreshToken(userId, newRefreshToken);

                    context.Response.Headers.Add("Authorization", "Bearer " + newToken);

                    context.Request.Headers.Remove("Authorization");
                    context.Request.Headers.Add("Authorization", "Bearer " + newToken);
                }
            }

            await _next(context);
        }
    }

}