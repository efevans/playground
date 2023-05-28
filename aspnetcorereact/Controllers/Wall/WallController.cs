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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var myId = User.GetLoggedInUserId<int>();

            List<WallPostView> wallPosts = await WallPostView.GetWallPostsForUser(myId, _userContext);

            //List<WallPostView> wallPosts = await _userContext.Database.SqlQuery<WallPostView>($"SELECT posts.*, l.\"Id\" IS NOT NULL AS \"LikedByMe\" FROM (SELECT p.*, u.\"Name\" AS \"UserName\", COUNT(l.\"Id\") AS \"LikeCount\" FROM \"Posts\" p JOIN \"Users\" u ON (p.\"UserId\" = u.\r\n\"Id\") LEFT JOIN \"Likes\" l ON (p.\"Id\" = l.\"PostId\") WHERE p.\"UserId\" = {myId} GROUP BY (p.\"Id\", p.\"Content\", p.\"CreatedAt\", p.\"UserId\", u.\"Name\")) posts\r\n LEFT JOIN \"Likes\" l on (posts.\"Id\" = l.\"PostId\" AND {myId} = l.\"UserId\") ORDER BY posts.\"Id\" DESC;").ToListAsync();

            return Ok(wallPosts);
        }
    }
}
