using System;
using Lokin_BackEnd.Domain.Errors;

namespace Lokin_BackEnd.Domain.ValueObjects
{
    public abstract class ValueObjectBase
    {
        protected string _value;
        protected Action<ErrorMessage> _setError;

        protected ValueObjectBase(Action<ErrorMessage> setError, string value)
        {
            _setError = setError;
            _value = value;

            Validate();
        }

        public override string ToString()
        {
            return _value;
        }

        protected abstract void Validate();
    }
}