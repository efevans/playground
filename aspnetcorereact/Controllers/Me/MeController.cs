using aspnetcorereact.Controllers.Identity;
using aspnetcorereact.Controllers.Me;
using aspnetcorereact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcorereact.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MeController : ControllerBase
    {
        private UserContext _userContext;

        public MeController(UserContext userContext)
        {
            _userContext = userContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.GetLoggedInUserId<int>();
            var user = await _userContext.Users.FindAsync(userId);

#pragma warning disable CS8604 // Possible null reference argument.
            MeResponse meResponse = new(user);
#pragma warning restore CS8604 // Possible null reference argument.

            return Ok(meResponse);
        }
    }
}
