using System;
using System.Collections.Generic;

namespace Ntier.DAL.Entities
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            RefreshTokens = new HashSet<RefreshToken>();
        }

        public string Id { get; set; } = null!;
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
    }
}
