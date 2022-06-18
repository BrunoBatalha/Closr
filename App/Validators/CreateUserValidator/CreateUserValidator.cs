using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;
using Lokin_BackEnd.Domain;
using Lokin_BackEnd.Domain.Errors;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.App.Validators.CreateUserValidator
{
    public class CreateUserValidator
    {
        private List<ErrorMessage> _errorMessages = new();
        private CreateUserInputBoundary _input;
        private IUserRepository _userRepository;

        public CreateUserValidator SetBoundary(CreateUserInputBoundary input, IUserRepository userRepository)
        {
            _input = input;
            _userRepository = userRepository;
            return this;
        }


        public void AddError(ErrorMessage error)
        {
            _errorMessages.Add(error);
        }

        public Action<ErrorMessage> GetAddError()
        {
            return (ErrorMessage error) => _errorMessages.Add(error);
        }

        public async Task Validate()
        {
            UserModel? user = await _userRepository.GetByEmail(_input.Email);
            if (user is not null)
            {
                _errorMessages.Add(CreateUserErrors.AlreadyExistsUserSameEmail);
            }
        }

        public bool HasError()
        {
            return _errorMessages.Count > 0;
        }

        public ErrorMessage[] GetErrors()
        {
            return _errorMessages.ToArray();
        }
    }
}