using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases.Login.Boundaries;
using Lokin_BackEnd.UseCases.Login.Boundaries;

namespace Lokin_BackEnd.Adapters.Interfaces.UseCases
{
    public interface ILoginUseCase
    {
        Task<LoginOutputBoundary> Execute(LoginInputBoundary input);
    }
}