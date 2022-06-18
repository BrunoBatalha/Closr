using AutoMapper;
using Lokin_BackEnd.App.Dtos;
using Lokin_BackEnd.Infra.Models;

namespace Lokin_BackEnd.Infra
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UserModel, UserDto>();
        }
    }
}