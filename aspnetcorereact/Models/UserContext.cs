using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace aspnetcorereact.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql("Host=localhost:5432;Username=postgres;Password=password;Database=blog;SearchPath=public;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>()
                .Property(b => b.CreatedAt)
                .HasDefaultValueSql("NOW()");

            modelBuilder.Entity<User>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("NOW()");

            modelBuilder.Entity<Like>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("NOW()");
        }
    }
}
