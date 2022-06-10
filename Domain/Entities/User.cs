using System;
using Lokin_BackEnd.Domain.ValueObjects;

namespace Lokin_BackEnd.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public Email Email { get; set; }
        public Password Password { get; set; }
    }
}