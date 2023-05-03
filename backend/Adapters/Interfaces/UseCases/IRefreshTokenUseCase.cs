using System.Threading.Tasks;
using Lokin_BackEnd.App.UseCases.RefreshToken.Boundaries;

namespace Lokin_BackEnd.Adapters.Interfaces.UseCases
{
    public interface IRefreshTokenUseCase
    {
        Task<RefreshTokenOutputBoundary> Execute(RefreshTokenInputBoundary input);
    }
}