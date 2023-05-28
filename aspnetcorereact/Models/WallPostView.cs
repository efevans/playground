using Microsoft.EntityFrameworkCore;
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

        public static async Task<List<WallPostView>> GetWallPostsForUser(int userId, UserContext userContext)
        {
            return await GetWallPostsForUser(userId, userId, userContext);
        }

        public static async Task<List<WallPostView>> GetWallPostsForUser(int usersId, int likeMatchUsersId, UserContext userContext)
        {
            List<WallPostView> wallPosts = await userContext.Database.SqlQuery<WallPostView>($"SELECT posts.*, l.\"Id\" IS NOT NULL AS \"LikedByMe\" FROM (SELECT p.*, u.\"Name\" AS \"UserName\", COUNT(l.\"Id\") AS \"LikeCount\" FROM \"Posts\" p JOIN \"Users\" u ON (p.\"UserId\" = u.\r\n\"Id\") LEFT JOIN \"Likes\" l ON (p.\"Id\" = l.\"PostId\") WHERE p.\"UserId\" = {usersId} GROUP BY (p.\"Id\", p.\"Content\", p.\"CreatedAt\", p.\"UserId\", u.\"Name\")) posts\r\n LEFT JOIN \"Likes\" l on (posts.\"Id\" = l.\"PostId\" AND {likeMatchUsersId} = l.\"UserId\") ORDER BY posts.\"Id\" DESC;").ToListAsync();

            return wallPosts;
        }
    }
}
