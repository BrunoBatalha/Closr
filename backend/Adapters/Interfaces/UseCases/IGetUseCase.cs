using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases.GetUser.Boundaries;

namespace Lokin_BackEnd.Adapters.Interfaces.UseCases
{
    public interface IGetUserUseCase
    {
        Task<GetUserOutputBoundary> Execute(GetUserInputBoundary input);
    }
}