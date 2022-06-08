namespace Lokin_BackEnd.App.Errors
{
    public static class CreateUserErrors
    {
        public readonly static ErrorMessage EmailInvalid = new("ERR-0001", "Email inválido");
        public readonly static ErrorMessage PasswordInvalid = new("ERR-0002", "Senha inválida");
        public readonly static ErrorMessage UsernameInvalid = new("ERR-0003", "Username inválido");
    }
}