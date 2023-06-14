using Ntier.DAL.Entities;
using Ntier.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsersAsync();
        Task<User?> AddUserAsync( UserRegisterDTO userDTO );
        Task<User?> CheckUserAsync( UserLoginDTO userLoginDTO );
    }
}
