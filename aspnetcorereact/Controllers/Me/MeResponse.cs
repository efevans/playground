using aspnetcorereact.Models;

namespace aspnetcorereact.Controllers.Me
{
    public class MeResponse
    {
        public User User { get; set; } = null!;
        public bool LoggedIn { get; set; } = false;

        public MeResponse(User user)
        {
            if (user != null)
            {
                LoggedIn = true;
                User = user;
            }
        }
    }
}
