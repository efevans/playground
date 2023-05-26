using Microsoft.EntityFrameworkCore;

namespace aspnetcorereact.Models
{
    [Index(nameof(PostId))]
    [Index(nameof(UserId), nameof(PostId))]
    public class Like
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
