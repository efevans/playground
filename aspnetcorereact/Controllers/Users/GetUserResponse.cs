using aspnetcorereact.Models;

namespace aspnetcorereact.Controllers.Users
{
    public class GetUserResponse
    {
        public string Name { get; set; } = null!;
        public List<WallPostView> Posts { get; set; } = null!;
    }
}
