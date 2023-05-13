using aspnetcorereact.Models;

namespace aspnetcorereact.Controllers.Me
{
    public class MeResponse
    {
        public User User { get; set; } = null!;

        public MeResponse(User user)
        {
            User = user;
        }
    }
}
