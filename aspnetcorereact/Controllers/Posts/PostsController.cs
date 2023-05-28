using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcorereact.Models;
using Microsoft.AspNetCore.Authorization;
using aspnetcorereact.Controllers.Identity;

namespace aspnetcorereact.Controllers.Posts
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly UserContext _context;

        public PostsController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> Get()
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            return await _context.Posts.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Get(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> Post(Post post)
        {
            if (_context.Posts == null)
            {
                return Problem("Entity set 'UserContext.Posts'  is null.");
            }

            var userId = User.GetLoggedInUserId<int>();

            var user = await _context.Users.Include(u => u.Posts).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            user.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/like")]
        public async Task<IActionResult> Like(int id)
        {
            if (_context.Likes == null)
            {
                return Problem("Entity set 'UserContext.Likes'  is null.");
            }

            var myId = User.GetLoggedInUserId<int>();

            if (_context.Likes.Any(l => l.PostId == id && l.UserId == myId))
            {
                return BadRequest("You have already liked this post");
            }

            Like like = new()
            {
                PostId = id,
                UserId = myId,
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            PostLikeResponse response = new()
            {
                PostId = id,
                PostIsLiked = true,
            };

            return Ok(response);
        }

        [HttpPost("{id}/unlike")]
        public async Task<IActionResult> Unlike(int id)
        {
            if (_context.Likes == null)
            {
                return Problem("Entity set 'UserContext.Likes'  is null.");
            }

            var myId = User.GetLoggedInUserId<int>();

            Like? like = _context.Likes.FirstOrDefault(l => l.PostId == id && l.UserId == myId);

            if (like == null)
            {
                return BadRequest("You have not liked post");
            }
            
            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            PostLikeResponse response = new()
            {
                PostId = id,
                PostIsLiked = false,
            };

            return Ok(response);
        }
    }
}
