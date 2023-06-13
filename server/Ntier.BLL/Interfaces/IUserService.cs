using Ntier.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.BLL.Interfaces
{
    public interface IUserService
    {
        public Task<ICollection<UserDTO>> GetUsersAsync();
    }
}
