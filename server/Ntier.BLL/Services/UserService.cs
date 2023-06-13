using AutoMapper;
using Ntier.BLL.Interfaces;
using Ntier.DAL.Interfaces;
using Ntier.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.BLL.Services
{
    public class UserService :IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService( IUserRepository userRepository , IMapper mapper ) {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<UserDTO>> GetUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();
            if ( users == null )
            {
                throw new Exception();
            }
            return _mapper.Map<ICollection<UserDTO>>( users );
        }
    }
}
