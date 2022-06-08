using System.Collections.Generic;
using Lokin_BackEnd.App.Errors;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;

namespace Lokin_BackEnd.App.Validators.CreateUserValidator
{
    public class CreateUserValidator
    {
        private List<ErrorMessage> _errorMessages = new();
        private CreateUserInputBoundary _input;

        public CreateUserValidator SetBoundary(CreateUserInputBoundary input)
        {
            _input = input;
            return this;
        }

        public void Validate()
        {
            if (string.IsNullOrEmpty(_input.Email))
            {
                _errorMessages.Add(CreateUserErrors.EmailInvalid);
            }

            if (string.IsNullOrEmpty(_input.Username))
            {
                _errorMessages.Add(CreateUserErrors.UsernameInvalid);
            }

            if (string.IsNullOrEmpty(_input.Password))
            {
                _errorMessages.Add(CreateUserErrors.PasswordInvalid);
            }
            else if (_input.Password.Length > 8)
            {
                _errorMessages.Add(CreateUserErrors.PasswordInvalid);
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