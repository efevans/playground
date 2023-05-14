import Post from "../types/post";

interface PostWallProps {
  posts: Post[];
}

const PostWall = ({ posts }: PostWallProps) => {
  return (
    <>
      {posts.map((post: Post) => {
        return (
          <div className="post-border" key={post.id}>
            <div className="post">
              <div className="post-content">{post.content}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostWall;
