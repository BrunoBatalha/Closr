using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.Dtos;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.GetUser.Boundaries;

namespace Lokin_BackEnd.App.UseCases.GetUser
{
    public class GetUserUseCase : IGetUserUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserUseCase(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<GetUserOutputBoundary> Execute(GetUserInputBoundary input)
        {
            var user = await _userRepository.GetById(input.Id);
            if (user is null)
            {
                return new GetUserOutputBoundary
                {
                    StatusCode = HttpStatusCode.NotFound
                };

            }
            return new GetUserOutputBoundary
            {
                Value = _mapper.Map<UserDto>(user)
            };
        }
    }
}