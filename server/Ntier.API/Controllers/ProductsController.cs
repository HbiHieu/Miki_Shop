using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ntier.BLL.Interfaces;
using Ntier.DTO.DTO.Products;

namespace Ntier.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;
        public ProductsController( IProductsService productsService ) { 
           _productsService = productsService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync( string id)
        {
            try
            {
                var product = await _productsService.GetProductByIdAsync(id);
                return Ok(product);
            }
            catch(Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync( [FromQuery] ProductQueryParameters queryParameters)
        {
            try
            {
                var products = await _productsService.GetProductsAsync(queryParameters);
                return Ok(products);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProductAsync( ProductToAddDTO productToAdd )
        {
            try
            {
                await _productsService.AddProductAsync(productToAdd);
                return Ok();
            }
            catch ( Exception ex )
            {
                return BadRequest( ex );
            }
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProductAsync(string[] productsId )
        {
            try
            {
               await _productsService.DeleteProductsAsync(productsId);
                return Ok(new {
                    message = "Delete products successfully"
                });
            }
            catch(Exception ex) { 
                return BadRequest( ex.Message );
            }
        }
    }
}
