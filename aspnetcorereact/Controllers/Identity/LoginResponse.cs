namespace aspnetcorereact.Controllers.Identity
{
    public class LoginResponse
    {
        public string Token { get; set; } = null!;
        public string Username { get; set; } = null!;

        public LoginResponse(string token, string username)
        {
            Token = token;
            Username = username;
        }
    }
}
