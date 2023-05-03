using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.Infra.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AppDbContext _context;
        public RefreshTokenRepository(AppDbContext context)
        {
            _context = context;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


        public async Task Create(Guid id, string refreshToken)
        {
            var refreshTokenModel = new RefreshTokenModel
            {
                Id = Guid.NewGuid(),
                UserId = id,
                Value = refreshToken
            };

            await _context.RefreshTokens.AddAsync(refreshTokenModel);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByUserId(Guid id)
        {
            RefreshTokenModel? refreshToken = _context.RefreshTokens.FirstOrDefault(rt => rt.UserId == id);
            if (refreshToken != null)
            {
                _context.RefreshTokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
            }
        }

        public RefreshTokenModel? GetByUserId(Guid id)
        {
            return _context.RefreshTokens.Where(rt => rt.UserId == id).FirstOrDefault();
        }
    }
}