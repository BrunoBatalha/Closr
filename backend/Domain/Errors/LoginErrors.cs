namespace Lokin_BackEnd.Domain.Errors
{
    public static class LoginErrors
    {
        public readonly static ErrorMessage LoginInvalid = new("ERR-L-0001", "Login inválido");
        public readonly static ErrorMessage TokenInformedNoCorrespondsToUser = new("ERR-L-0002", "O token informado não corresponde ao último gerado para este usuário");
        public readonly static ErrorMessage TokenInvalid = new("ERR-L-0003", "Token inválido");
    }
}