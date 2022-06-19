using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces;

namespace Lokin_BackEnd.Infra.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private static List<(Guid, string)> _refreshTokens = new List<(Guid, string)>();

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


        public async Task SaveRefreshToken(Guid id, string refreshTokens)
        {
            _refreshTokens.Add(new(id, refreshTokens));
        }

        public async Task DeleteRefreshToken(Guid id)
        {
            var item = _refreshTokens.FirstOrDefault(rt => rt.Item1 == id);
            if (item.Item2 != null)
            {
                _refreshTokens.Remove(item);
            }
        }

        public async Task<(Guid, string)> GetRefreshTokenByUserId(Guid? id)
        {
            return _refreshTokens.FirstOrDefault(rt => rt.Item1 == id);
        }
    }
}