using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Controllers;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.Login.Boundaries;
using Lokin_BackEnd.UseCases.Login.Boundaries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lokin_BackEnd.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerCustomBase
{
    private readonly ILogger<LoginController> _logger;
    private readonly ILoginUseCase _loginUseCase;
    private readonly IRefreshTokenUseCase _refreshTokenUseCase;

    public LoginController(ILogger<LoginController> logger, ILoginUseCase loginUseCase,
        IRefreshTokenUseCase refreshTokenUseCase)
    {
        _logger = logger;
        _loginUseCase = loginUseCase;
        _refreshTokenUseCase = refreshTokenUseCase;
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Login([FromBody] LoginInputBoundary input)
    {
        return await Result(async () =>
        {
            LoginOutputBoundary output = await _loginUseCase.Execute(input);
            if (output.Errors == null && output.StatusCode == null)
            {
                Response.Headers.Authorization = "Bearer " + output.Value.Token;
                Response.Headers.Add("Refresh-Token", output.Value.RefreshToken);
            }
            return GetResultOk(output);
        });
    }

    [HttpPost]
    [Route("refreshToken"), Obsolete]
    public async Task<IActionResult> RefreshToken([FromHeader] string authorization, [FromHeader] string refreshToken)
    {
        return await Result(async () => GetResultOk(await _refreshTokenUseCase.Execute(new()
        {
            Authorization = authorization,
            RefreshToken = refreshToken
        })));
    }
}
