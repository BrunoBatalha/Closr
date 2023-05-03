using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.App.Interfaces
{
    public interface IRefreshTokenRepository
    {
        string GenerateRefreshToken();

        Task Create(Guid id, string refreshTokens);

        Task DeleteByUserId(Guid id);

        RefreshTokenModel? GetByUserId(Guid id);
    }
}