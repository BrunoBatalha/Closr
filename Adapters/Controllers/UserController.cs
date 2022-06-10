using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Lokin_BackEnd.App.UseCases.GetUser.Boundaries;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IGetUserUseCase _getUserUseCase;

        public UserController(ILogger<UserController> logger, ICreateUserUseCase createUserUseCase, IGetUserUseCase getUserUseCase)
        {
            _logger = logger;
            _createUserUseCase = createUserUseCase;
            _getUserUseCase = getUserUseCase;
        }

        // [HttpGet]
        // [Route("")]
        // public async Task<IActionResult> GetUser()
        // {
        //     var users = await _context.Users.AsNoTracking().ToListAsync();

        //     return Ok(users);
        // }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            try
            {
                GetUserOutputBoundary outputBoundary = await _getUserUseCase.Execute(new()
                {
                    Id = id
                });

                if (outputBoundary.Errors != null && outputBoundary.Errors.Length > 0)
                {
                    return BadRequest(outputBoundary.Errors);
                }

                if (outputBoundary.StatusCode != null)
                {
                    return StatusCode(((int)outputBoundary.StatusCode));
                }

                return Ok(outputBoundary.Value);
            }
            catch (System.Exception exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exception);
            }
        }

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