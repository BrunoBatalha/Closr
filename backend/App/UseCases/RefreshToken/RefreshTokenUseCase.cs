using System.Security.Claims;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.RefreshToken.Boundaries;
using Lokin_BackEnd.App.Validators.RefreshTokenValidator;
using Lokin_BackEnd.Infra;

namespace Lokin_BackEnd.App.UseCases.RefreshToken
{
    public class RefreshTokenUseCase : IRefreshTokenUseCase
    {
        public async Task<RefreshTokenOutputBoundary> Execute(RefreshTokenInputBoundary input)
        {
            // var validator = new RefreshTokenValidator();
            // validator.SetBoundary(input);

            // ClaimsPrincipal? principal = TokenService.GetPrincipalFromExpiredToken(input.Authorization.Split(' ')[1]);
            // string? email = principal?.Identity?.Name;
            // string? savedRefreshToken = TokenService.GetRefreshToken(email).Item2;

            // validator.Validate(savedRefreshToken, principal);
            // if (validator.HasError())
            // {
            //     return new() { Errors = validator.GetErrors() };
            // }

            // var newJwtToken = TokenService.GenerateToken(principal.Claims);
            // var newRefreshToken = TokenService.GenerateRefreshToken();

            // TokenService.DeleteRefreshToken(email, input.RefreshToken);
            // TokenService.SaveRefreshToken(email, newRefreshToken);

            return await Task.FromResult<RefreshTokenOutputBoundary>(new()
            {
                Value = new()
                {
                    Token = null,
                    RefreshToken = null,
                }
            });
        }
    }
}