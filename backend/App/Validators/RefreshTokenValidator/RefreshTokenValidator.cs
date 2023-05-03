using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases.RefreshToken.Boundaries;
using Lokin_BackEnd.Domain.Errors;

namespace Lokin_BackEnd.App.Validators.RefreshTokenValidator
{
    public class RefreshTokenValidator
    {
        private List<ErrorMessage> _errorMessages = new();
        private RefreshTokenInputBoundary _input;

        public void SetBoundary(RefreshTokenInputBoundary input)
        {
            _input = input;
        }

        public void AddError(ErrorMessage error)
        {
            _errorMessages.Add(error);
        }

        public Action<ErrorMessage> GetAddError()
        {
            return (ErrorMessage error) => _errorMessages.Add(error);
        }

        public void Validate(string savedRefreshToken, ClaimsPrincipal? principalClaims)
        {
            if (principalClaims is null)
            {
                AddError(LoginErrors.TokenInvalid);
            }

            if (savedRefreshToken != _input.RefreshToken)
            {
                AddError(LoginErrors.TokenInformedNoCorrespondsToUser);
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