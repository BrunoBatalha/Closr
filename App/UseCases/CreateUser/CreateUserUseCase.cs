using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Adapters.Interfaces.UseCases;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Lokin_BackEnd.App.Validators.CreateUserValidator;
using Lokin_BackEnd.Domain;
using Lokin_BackEnd.Domain.ValueObjects;

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

            var user = new User
            {
                Id = Guid.NewGuid(),
                Password = new Password(validator.GetAddError(), input.Password),
                Username = input.Username,
                Email = new Email(validator.GetAddError(), input.Email),
            };

            if (validator.HasError())
            {
                return new CreateUserOutputBoundary { Errors = validator.GetErrors() };
            }

            await userRepository.CreateAsync(user);

            return new CreateUserOutputBoundary
            {
                Value = new Output
                {
                    Id = user.Id.ToString(),
                    Username = user.Username,
                    Email = user.Email.ToString()
                }
            };
        }
    }
}