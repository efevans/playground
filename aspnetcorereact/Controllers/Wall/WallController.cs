using aspnetcorereact.Controllers.Identity;
using aspnetcorereact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace aspnetcorereact.Controllers.Wall
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WallController : ControllerBase
    {
        private readonly UserContext _userContext;

        public WallController(UserContext userContext)
        {
            _userContext = userContext;
        }

        [HttpGet] public async Task<IActionResult> Get()
        {
            var myId = User.GetLoggedInUserId<int>();

            var posts = await _userContext.Posts.Where(p => p.UserId == myId).OrderByDescending(p => p.Id).ToListAsync();
            return Ok(posts);
        }
    }
}
