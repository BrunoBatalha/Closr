using System;
using Lokin_BackEnd.Infra.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Lokin_BackEnd.Infra
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<RefreshTokenModel> RefreshTokens { get; set; }

        private readonly IConfiguration _configuration;
        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(_configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(5, 7, 38)));
        }
    }
}