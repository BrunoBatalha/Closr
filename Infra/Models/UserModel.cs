using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lokin_BackEnd.Infra.Models
{
    public class UserModel
    {
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public Guid Id { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(255)]
        public string Username { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(255)]
        public string Email { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(255)]
        public string Password { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string Role { get; set; }

        public List<RefreshTokenModel> RefreshTokens { get; set; }
    }
}