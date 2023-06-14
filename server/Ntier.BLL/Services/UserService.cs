using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Ntier.BLL.Interfaces;
using Ntier.DAL.Interfaces;
using Ntier.DTO.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.BLL.Services
{
    public class UserService :IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UserService( IUserRepository userRepository , IMapper mapper , IConfiguration configuration ) {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ICollection<UserRegisterDTO>> GetUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();
            if ( users == null )
            {
                throw new Exception();
            }
            return _mapper.Map<ICollection<UserRegisterDTO>>( users );
        }

        public async Task RegisterUserAsync(UserRegisterDTO userDTO)
        {
            var user = await _userRepository.AddUserAsync( userDTO );
            if ( user == null )
            {
                throw new ArgumentException("Email already exits");
            }
        }

        public async Task<UserDTO?> LoginUserAsync(UserLoginDTO userDTO)
        {
            var user = await _userRepository.CheckUserAsync(userDTO);
            if ( user != null )
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration.GetConnectionString("SecretKey") );
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Role, user.Role ),
                }),
                    Expires = DateTime.UtcNow.AddDays(30),
                    SigningCredentials = new SigningCredentials
                    (new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                UserDTO userDto = new UserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    Access_token = jwtToken,
                    Name = user.Name,
                };
                return userDto;
            }
            else
            {
                throw new ArgumentException("Icorrect Email or password");
            }
        }
    }
}
