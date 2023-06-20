using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ntier.BLL.Interfaces;
using Ntier.DTO.DTO.Products;
using static System.Net.Mime.MediaTypeNames;

namespace Ntier.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        public ImagesController( IImageService imageService ) { 
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> AddImagesAsync( ICollection<ImageDTO> images )
        {
            try
            {
            var imgs = await _imageService.AddImageAsync(images);
                return Ok(new {
                    message = "Create image succecfully",
                    data = imgs,
                });
            }
            catch ( Exception ex )
            {
                return BadRequest( ex );
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteImagesAsync( string[] productsId )
        {
            try
            {
                await _imageService.DeleteImagesAsync( productsId );
                return Ok(new
                {
                    message = "Delete image succecfully",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
