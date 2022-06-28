using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lokin_BackEnd.Infra.Models
{
    public class RefreshTokenModel
    {
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public Guid Id { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public Guid UserId { get; set; }

        public UserModel User { get; set; }

        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string Value { get; set; }
    }
}