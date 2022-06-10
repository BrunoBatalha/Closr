using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.Login.Boundaries;
using Lokin_BackEnd.UseCases.Login.Boundaries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lokin_BackEnd.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerBase
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
        try
        {
            LoginOutputBoundary outputBoundary = await _loginUseCase.Execute(input);

            if (outputBoundary.Errors != null && outputBoundary.Errors.Length > 0)
            {
                return BadRequest(outputBoundary.Errors);
            }

            return Ok(outputBoundary.Value);
        }
        catch (System.Exception exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, exception);
        }
    }
}
