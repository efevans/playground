using System.ComponentModel.DataAnnotations.Schema;

namespace aspnetcorereact.Models
{
    [NotMapped]
    public class WallPostView
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public int LikeCount { get; set; }
        public bool LikedByMe { get; set; }
    }
}
