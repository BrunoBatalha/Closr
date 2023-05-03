namespace Lokin_BackEnd.App.UseCases.RefreshToken.Boundaries
{
    public class RefreshTokenInputBoundary
    {
        public string Authorization { get; set; }
        public string RefreshToken { get; set; }
    }
}