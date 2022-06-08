using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lokin_BackEnd.App.Interfaces.Repositories;
using Lokin_BackEnd.Domain;
using Lokin_BackEnd.Infra;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public static User? Get(string username, string password)
        {
            var users = new List<User>{
                new User { Id = Guid.NewGuid(), Username = "batman", Password = "batman", Role = "manager" },
                new User { Id = Guid.NewGuid(), Username = "robin", Password = "robin", Role = "employee" }
            };

            return users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
        }

        public async Task CreateAsync(User user)
        {
            var userModel = new UserModel
            {
                Email = user.Email,
                Id = user.Id,
                Password = user.Password,
                Username = user.Username,
                Role = user.Role
            };

            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
        }
    }
}