using aspnetcorereact.Controllers.Helpers;
using aspnetcorereact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcorereact.Controllers.Identity;

namespace aspnetcorereact.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _dbContext;

        public UserController(UserContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<PaginationResponse<User>> Get([FromQuery] SearchParameters parameters)
        {
            //var users = await _dbContext.Users.ToListAsync();
            var username = User.GetLoggedInUserName();
            var email = User.GetLoggedInUserEmail();
            var id = User.GetLoggedInUserId<int>();
            var pagedUsers = await _dbContext.Users
                .OrderBy(b => b.CreatedAt)
                .Skip(parameters.Skip)
                .Take(parameters.PageSize)
                .Include(u => u.Posts)
                .ToListAsync();

            //pagedUsers.ForEach(u =>
            //{
            //    u.Posts = _dbContext.Posts.Where(p => p.UserId == u.Id).ToList();
            //});
            int count = await _dbContext.Users.CountAsync();
            return new PaginationResponse<User>(pagedUsers, count, parameters.PageSize);
        }

        [HttpGet("{id}")]
        public async Task<User> Get(int id)
        {
            var user = await _dbContext.Users.Include(u => u.Posts).Where(x => x.Id == id).SingleAsync();
            //User? user = await _dbContext.Users.FindAsync(id);
            return user;
        }
    }
}
