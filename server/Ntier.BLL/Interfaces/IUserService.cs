﻿using Ntier.DAL.Entities;
using Ntier.DTO.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.BLL.Interfaces
{
    public interface IUserService
    {
        public Task<ICollection<UserRegisterDTO>> GetUsersAsync();
        public Task RegisterUserAsync(UserRegisterDTO userDTO);

        public Task<UserDTO?> LoginUserAsync(UserLoginDTO userDTO);

        public Task<string> GenerateAccessToken(User user);

        public Task<string> GenerateRefreshToken(User user);

        public Task<string> GetNewAccessTokenAsync( string userId );
    }
}
