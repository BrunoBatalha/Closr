using System;
using System.Threading.Tasks;

namespace Lokin_BackEnd.App.Interfaces
{
    public interface IRefreshTokenRepository
    {
        string GenerateRefreshToken();

        Task SaveRefreshToken(Guid id, string refreshTokens);

        Task DeleteRefreshToken(Guid id);

        Task<(Guid, string)> GetRefreshTokenByUserId(Guid? id);
    }
}