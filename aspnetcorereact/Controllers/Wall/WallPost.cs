using aspnetcorereact.Models;

namespace aspnetcorereact.Controllers.Wall
{
    public class WallPost
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public int LikesCount { get; set; }
        public bool LikedByMe { get; set; }

        public WallPost(int id, string content, DateTime createdAt, int userId, string userName)
        {
            Id = id;
            Content = content;
            CreatedAt = createdAt;
            UserId = userId;
            UserName = userName;
        }
    }
}
