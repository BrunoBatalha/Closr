using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Controllers;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
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

    public LoginController(ILogger<LoginController> logger, ILoginUseCase loginUseCase)
    {
        _logger = logger;
        _loginUseCase = loginUseCase;
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Login([FromBody] LoginInputBoundary input)
    {
        return await Result(async () => GetResultOk(await _loginUseCase.Execute(input)));
    }
}
