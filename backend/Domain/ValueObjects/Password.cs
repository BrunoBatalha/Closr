
using System;
using Lokin_BackEnd.Domain.Errors;

namespace Lokin_BackEnd.Domain.ValueObjects
{
    public class Password : ValueObjectBase
    {
        private const short MinLengthPassword = 8;

        public Password(Action<ErrorMessage> setError, string value) : base(setError, value)
        {
        }

        protected override void Validate()
        {
            if (string.IsNullOrEmpty(_value))
            {
                _setError(CreateUserErrors.PasswordInvalid);
            }
            else if (_value.Length < MinLengthPassword)
            {
                _setError(CreateUserErrors.PasswordInvalid);
            }
        }
    }
}