namespace Lokin_BackEnd.Domain.Errors
{
    public static class LoginErrors
    {
        public readonly static ErrorMessage LoginInvalid = new("ERR-L-0001", "Login inválido");
    }
}