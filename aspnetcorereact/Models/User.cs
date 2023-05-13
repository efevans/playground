using Microsoft.EntityFrameworkCore;

namespace aspnetcorereact.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public List<Post> Posts { get; set; } = null!;
    }
}
