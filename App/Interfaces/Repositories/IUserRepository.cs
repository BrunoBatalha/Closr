using System;
using System.Threading.Tasks;
using Lokin_BackEnd.Domain;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.App.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task CreateAsync(User user);

        Task<UserModel?> GetByCredentials(string username, string email);

        Task<UserModel?> GetById(Guid id);
    }
}