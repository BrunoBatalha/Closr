using System.Threading.Tasks;
using AutoMapper;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.Dtos;
using Lokin_BackEnd.App.UseCases.Login.Boundaries;
using Lokin_BackEnd.Domain.Errors;
using Lokin_BackEnd.Infra;
using Lokin_BackEnd.UseCases.Login.Boundaries;

namespace Lokin_BackEnd.App.UseCases.Login
{
    public class LoginUseCase : ILoginUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public LoginUseCase(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }


        public async Task<LoginOutputBoundary> Execute(LoginInputBoundary input)
        {
            var user = await _userRepository.GetByCredentials(input.Email, input.Password);

            if (user is null)
            {
                return new LoginOutputBoundary
                {
                    Errors = new ErrorMessage[] { LoginErrors.LoginInvalid }
                };
            }

            return new LoginOutputBoundary
            {
                Value = new()
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = TokenService.GenerateToken(user)
                }
            };
        }
    }
}