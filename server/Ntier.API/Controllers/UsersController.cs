using Microsoft.AspNetCore.Mvc;
using Ntier.BLL.Interfaces;
using Ntier.DTO.DTO;

namespace Ntier.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        public UsersController( IUserService userService ) {
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUser() {
            try
            {
                var users = await _userService.GetUsersAsync();
                return Ok( users ); 
            }
            catch ( Exception ex )
            {
                return BadRequest( ex.Message );
            }
        }
    }
}
