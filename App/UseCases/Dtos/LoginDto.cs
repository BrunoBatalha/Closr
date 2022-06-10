namespace Lokin_BackEnd.App.UseCases.Dtos
{
    public class LoginDto
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}