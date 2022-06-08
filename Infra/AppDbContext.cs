using Lokin_BackEnd.Infra.Models;
using Microsoft.EntityFrameworkCore;

namespace Lokin_BackEnd.Infra
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("DataSource=app.db;Cache=Shared");
        }
    }
}