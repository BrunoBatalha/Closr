namespace Lokin_BackEnd.App.UseCases.CreateUser.Boundaries
{
    public class CreateUserOutputBoundary : OutputBoundaryBase<Output>
    {
    }

    public class Output
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}