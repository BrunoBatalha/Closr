namespace Lokin_BackEnd.Domain.Errors
{
    public static class CreateUserErrors
    {
        public readonly static ErrorMessage EmailInvalid = new("ERR-CUE-0001", "Email inválido");
        public readonly static ErrorMessage PasswordInvalid = new("ERR-CUE-0002", "Senha inválida");
        public readonly static ErrorMessage UsernameInvalid = new("ERR-CUE-0003", "Username inválido");
    }
}