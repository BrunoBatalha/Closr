using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Controllers;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Lokin_BackEnd.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserController : ControllerCustomBase
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

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            return await Result(async () => GetResultOk(await _getUserUseCase.Execute(new()
            {
                Id = id
            })));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserInputBoundary input)
        {
            return await Result(async () =>
            {
                CreateUserOutputBoundary outputBoundary = await _createUserUseCase.Execute(input);
                return GetResultCreated(outputBoundary, $"api/v1/users/{outputBoundary.Value.Id}");
            });
        }
    }
}