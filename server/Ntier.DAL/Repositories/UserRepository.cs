using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Ntier.DAL.Context;
using Ntier.DAL.Entities;
using Ntier.DAL.Interfaces;
using Ntier.DTO.DTO;
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

        public async Task<User?> AddUserAsync( UserRegisterDTO userDTO )
        {
            string sql = "EXEC dbo.REGISTER_USER @UserId , @Email , @Password , @Name";
                var result = await _context.Users.FromSqlRaw
                (sql,
                new SqlParameter("@UserId", userDTO.Id),
                new SqlParameter("@Email", userDTO.Email),
                new SqlParameter("@Password", userDTO.Password),
                new SqlParameter("@Name", userDTO.Name)
            ).ToListAsync();

             User? user = result.FirstOrDefault();

             return user;
        }

        public async Task<User?> CheckUserAsync(UserLoginDTO userLoginDTO)
        {
            string sql = "EXEC [dbo].[LOGIN_USER] @Email , @Password ;";
            var result = await _context.Users.FromSqlRaw
            (sql ,
            new SqlParameter("@Email" , userLoginDTO.Email) ,
            new SqlParameter("@Password" ,userLoginDTO.Password)
            ).ToListAsync ();

            User? user = result.FirstOrDefault();

            return user;
        }
    }
}
