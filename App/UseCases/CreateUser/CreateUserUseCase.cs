using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Lokin_BackEnd.App.Validators.CreateUserValidator;
using Lokin_BackEnd.Domain;

namespace Lokin_BackEnd.App.UseCases.CreateUser
{
    public class CreateUserUseCase : ICreateUserUseCase
    {
        private readonly IUserRepository userRepository;

        public CreateUserUseCase(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<CreateUserOutputBoundary> Execute(CreateUserInputBoundary input)
        {
            var validator = new CreateUserValidator();
            validator.SetBoundary(input).Validate();

            if (validator.HasError())
            {
                return new CreateUserOutputBoundary
                {
                    Errors = validator.GetErrors()
                };
            }

            var user = new User((ERRO) => ADICIONA_O_ERRO(ERRO)) // FAZENDO ISSO O ERRO SERÁ VALIDADO DE FATO NA CAMADA DOMAIN
            {
                Id = Guid.NewGuid(),
                Password = input.Password,
                Username = input.Username,
                Email = input.Email,
                Role = "manager",
            };
            await userRepository.CreateAsync(user);

            return new CreateUserOutputBoundary
            {
                Value = new Output
                {
                    Id = user.Id.ToString(),
                    Username = user.Username,
                    Email = user.Email
                }
            };
        }
    }
}