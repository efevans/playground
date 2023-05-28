using aspnetcorereact.Controllers.Helpers;
using aspnetcorereact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcorereact.Controllers.Identity;

namespace aspnetcorereact.Controllers.Users
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _userContext;

        public UsersController(UserContext dbContext)
        {
            _userContext = dbContext;
        }

        [HttpGet]
        public async Task<PaginationResponse<User>> Get([FromQuery] SearchParameters parameters)
        {
            //var users = await _dbContext.Users.ToListAsync();
            var username = User.GetLoggedInUserName();
            var email = User.GetLoggedInUserEmail();
            var id = User.GetLoggedInUserId<int>();
            var pagedUsers = await _userContext.Users
                .OrderBy(b => b.CreatedAt)
                .Skip(parameters.Skip)
                .Take(parameters.PageSize)
                .Include(u => u.Posts)
                .ToListAsync();

            //pagedUsers.ForEach(u =>
            //{
            //    u.Posts = _dbContext.Posts.Where(p => p.UserId == u.Id).ToList();
            //});
            int count = await _userContext.Users.CountAsync();
            return new PaginationResponse<User>(pagedUsers, count, parameters.PageSize);
        }

        [HttpGet("{id}")]
        public async Task<GetUserResponse> Get(int id)
        {
            var user = await _userContext.Users.Include(u => u.Posts).Where(x => x.Id == id).SingleAsync();
            List<WallPostView> posts = await WallPostView.GetWallPostsForUser(id, _userContext);

            var resp = new GetUserResponse()
            {
                Name = user.Name,
                Posts = posts
            };

            return resp;
        }
    }
}
