using System;
using System.Net.Mail;
using Lokin_BackEnd.Domain.Errors;

namespace Lokin_BackEnd.Domain.ValueObjects
{
    public class Email : ValueObjectBase
    {
        public Email(Action<ErrorMessage> setError, string value) : base(setError, value)
        {
        }

        protected override void Validate()
        {
            try
            {
                var _ = new MailAddress(_value);
            }
            catch
            {
                _setError(CreateUserErrors.EmailInvalid);
            }
        }
    }
}