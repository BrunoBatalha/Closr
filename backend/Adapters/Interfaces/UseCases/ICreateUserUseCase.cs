using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases.CreateUser.Boundaries;

namespace Lokin_BackEnd.Adapters.Interfaces.UseCases
{
    public interface ICreateUserUseCase
    {
        Task<CreateUserOutputBoundary> Execute(CreateUserInputBoundary input);
    }
}