using System.Threading.Tasks;
using AutoMapper;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.Dtos;
using Lokin_BackEnd.App.Interfaces;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.Login.Boundaries;
using Lokin_BackEnd.Domain.Errors;
using Lokin_BackEnd.Infra;
using Lokin_BackEnd.Infra.Models;
using Lokin_BackEnd.UseCases.Login.Boundaries;

namespace Lokin_BackEnd.App.UseCases.Login
{
    public class LoginUseCase : ILoginUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public LoginUseCase(IMapper mapper, IUserRepository userRepository, IRefreshTokenRepository refreshTokenUseCase)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenUseCase;
        }

        public async Task<LoginOutputBoundary> Execute(LoginInputBoundary input)
        {
            UserModel? user = await _userRepository.GetByCredentials(input.Email, input.Password);

            if (user is null)
            {
                return new LoginOutputBoundary
                {
                    Errors = new ErrorMessage[] { LoginErrors.LoginInvalid }
                };
            }

            string refreshToken = _refreshTokenRepository.GenerateRefreshToken();
            await _refreshTokenRepository.SaveRefreshToken(user.Id, refreshToken);

            return new LoginOutputBoundary
            {
                Value = new()
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = TokenService.GenerateToken(user),
                    RefreshToken = refreshToken
                }
            };
        }
    }
}