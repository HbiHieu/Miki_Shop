using Microsoft.EntityFrameworkCore;
using Ntier.DAL.Context;
using Ntier.DAL.Entities;
using Ntier.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ShopContext _context;
        public UserRepository( ShopContext context ) { 
            _context = context;
        }

        public async Task<ICollection<User>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}
