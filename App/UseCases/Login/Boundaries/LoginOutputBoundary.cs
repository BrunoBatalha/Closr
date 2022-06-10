using Lokin_BackEnd.App.UseCases.Dtos;

namespace Lokin_BackEnd.App.UseCases.Login.Boundaries
{
    public class LoginOutputBoundary : OutputBoundaryBase<LoginValueOutputBoundary>
    {
    }

    public class LoginValueOutputBoundary
    {
        public UserDto User { get; set; }
        public string Token { get; set; }
    }
}