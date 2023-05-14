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

            //List<Post> posts = new List<Post>
            //{
            //    new Post()
            //    {
            //        Id = 1,
            //        Content = "My first post!",
            //        CreatedAt = DateTime.Now.AddSeconds(-123456),
            //    },
            //    new Post()
            //    {
            //        Id = 2,
            //        Content = "My second post!",
            //        CreatedAt = DateTime.Now.AddSeconds(-12345),
            //    },
            //    new Post()
            //    {
            //        Id = 3,
            //        Content = "My third post!",
            //        CreatedAt = DateTime.Now.AddSeconds(-1234),
            //    },
            //    new Post()
            //    {
            //        Id = 4,
            //        Content = "My fourth post!",
            //        CreatedAt = DateTime.Now.AddSeconds(-123),
            //    }
            //};
            return Ok(posts);
        }
    }
}
