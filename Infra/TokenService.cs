using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Lokin_BackEnd.Infra.Models;
using Microsoft.IdentityModel.Tokens;

namespace Lokin_BackEnd.Infra
{
    public static class TokenService
    {
        public static string GenerateToken(UserModel user)
        {
            return GenerateToken(new[]{
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                });
        }

        public static string GenerateToken(IEnumerable<Claim> claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public static ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, GetTokenValidationParameters(), out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        public static bool IsTokenExpired(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(token, GetTokenValidationParameters(), out SecurityToken validatedToken);

            return DateTime.UtcNow > validatedToken.ValidTo;
        }

        public static Guid GetUserId(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            return new Guid(jwtSecurityToken.Claims.First(claim => claim.Type == "nameid").Value);
        }

        private static TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Settings.Secret)),
                ValidateLifetime = false
            };
        }


        private static List<(Guid, string)> _refreshTokens = new List<(Guid, string)>();

        public static void SaveRefreshToken(Guid id, string refreshTokens)
        {
            _refreshTokens.Add(new(id, refreshTokens));
        }

        public static void DeleteRefreshToken(Guid id, string refreshToken)
        {
            var item = _refreshTokens.FirstOrDefault(rt => rt.Item1 == id && rt.Item2 == refreshToken);
            _refreshTokens.Remove(item);
        }

        public static void DeleteRefreshToken(Guid id)
        {
            var item = _refreshTokens.FirstOrDefault(rt => rt.Item1 == id);
            _refreshTokens.Remove(item);
        }

        public static (Guid, string) GetRefreshToken(Guid? id)
        {
            return _refreshTokens.FirstOrDefault(rt => rt.Item1 == id);
        }
    }
}