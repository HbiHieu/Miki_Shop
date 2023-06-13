using AutoMapper;
using Ntier.DAL.Entities;
using Ntier.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ntier.BLL.Extentions
{
    public class AutoMapper : Profile
    {
        public AutoMapper() { 
            CreateMap<User,UserDTO>().ReverseMap();
        }
    }
}
