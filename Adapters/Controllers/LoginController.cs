using Lokin_BackEnd.Infra;
using Lokin_BackEnd.Repositories;
using Lokin_BackEnd.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lokin_BackEnd.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerBase
{
    private readonly ILogger<LoginController> _logger;

    public LoginController(ILogger<LoginController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    [Route("")]
    public ActionResult<dynamic> Login([FromBody] LoginViewModel model)
    {
        var user = UserRepository.Get(model.Username, model.Password);

        if (user == null)
        {
            return NotFound(new { message = "Usuário ou senha inválidos" });
        }

        var token = TokenService.GenerateToken(user);
        user.Password = "";
        return new
        {
            user = user,
            token = token
        };
    }
}
