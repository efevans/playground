import { PostProps } from "./Post";

interface PostWallProps {
  posts: PostProps[];
}

const PostWall = ({ posts }: PostWallProps) => {
  return (
    <>
      {posts.map((post: PostProps) => {
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
