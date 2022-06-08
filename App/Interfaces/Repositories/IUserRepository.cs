using System.Threading.Tasks;
using Lokin_BackEnd.Domain;

namespace Lokin_BackEnd.App.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task CreateAsync(User user);
    }
}