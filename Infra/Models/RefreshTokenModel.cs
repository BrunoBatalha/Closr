using System;

namespace Lokin_BackEnd.Infra.Models
{
    public class RefreshTokenModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public string Value { get; set; }
    }
}