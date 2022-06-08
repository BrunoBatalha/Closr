
using Lokin_BackEnd.App.Errors;

namespace Lokin_BackEnd.App.UseCases.CreateUser.Boundaries
{
    public class CreateUserOutputBoundary
    {
        public ErrorMessage[] Errors { get; set; }
        public Output Value { get; set; }
    }

    public class Output
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}