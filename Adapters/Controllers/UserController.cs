using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lokin_BackEnd.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly ICreateUserUseCase _createUserUseCase;

        public UserController(ILogger<UserController> logger, ICreateUserUseCase createUserUseCase)
        {
            _logger = logger;
            _createUserUseCase = createUserUseCase;
        }

        // [HttpGet]
        // [Route("")]
        // public async Task<IActionResult> GetUser()
        // {
        //     var users = await _context.Users.AsNoTracking().ToListAsync();

        //     return Ok(users);
        // }

        // [HttpGet]
        // [Route("{id}")]
        // public async Task<IActionResult> GetUser([FromRoute] Guid id)
        // {
        //     var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);

        //     return user == null ? NotFound() : Ok(user);
        // }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserInputBoundary input)
        {
            try
            {
                CreateUserOutputBoundary outputBoundary = await _createUserUseCase.Execute(input);

                if (outputBoundary.Errors != null && outputBoundary.Errors.Length > 0)
                {
                    return BadRequest(outputBoundary.Errors);
                }

                return Created($"api/v1/users/{outputBoundary.Value.Id}", outputBoundary.Value);
            }
            catch (System.Exception exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exception);
            }
        }
    }
}