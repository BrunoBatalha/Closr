namespace Lokin_BackEnd.App.Dtos
{
    public class LoginDto
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}