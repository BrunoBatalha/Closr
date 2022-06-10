using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.Domain;
using Lokin_BackEnd.Infra;
using Lokin_BackEnd.Infra.Models;
using Microsoft.EntityFrameworkCore;

namespace Lokin_BackEnd.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserModel?> GetById(Guid id)
        {
            return await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserModel?> GetByCredentials(string username, string password)
        {
            var passwordEncode = PasswordService.Encode(password);
            return await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Username == username && passwordEncode == u.Password);
        }


        public async Task CreateAsync(User user)
        {
            var userModel = new UserModel
            {
                Id = user.Id,
                Email = user.Email.ToString(),
                Password = PasswordService.Encode(user.Password.ToString()),
                Username = user.Username,
                Role = "common"
            };

            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
        }
    }
}