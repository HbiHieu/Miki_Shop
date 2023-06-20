using AutoMapper;
using Ntier.BLL.Interfaces;
using Ntier.DAL.Entities;
using Ntier.DAL.Interfaces;
using Ntier.DTO.DTO.Products;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Ntier.BLL.Services
{

    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ImageService(IImageRepository imageRepository , IMapper mapper , IConfiguration configuration )
        {
            _imageRepository = imageRepository;    
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ICollection<ImageDTO>> AddImageAsync( ICollection<ImageDTO> images )
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(_configuration.GetConnectionString("ApiUrl"));
                cloudinary.Api.Secure = true;
                foreach( var image in images )
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription($@"{image.Url}"),
                        Folder = "Miki_Shop",
                        Overwrite = true,
                    };
                    var uploadResult = await cloudinary.UploadAsync(uploadParams);
                    image.Url = uploadResult.Url.ToString();
                }
                var imgs = await _imageRepository.AddImagesAsync(_mapper.Map<ICollection<ProductImage>>(images));
                return _mapper.Map<ICollection<ImageDTO>>(imgs);
            }
            catch ( Exception ex )
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteImagesAsync(string[] productsId)
        {
            await _imageRepository.DeleteImagesAsync(productsId);
        }
    }
}
