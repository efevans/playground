import Post, { PostProps } from "./Post";

interface PostWallProps {
  posts: PostProps[];
}

const PostWall = ({ posts }: PostWallProps) => {
  return (
    <div id="post-wall">
      {posts.map((post: PostProps) => {
        return <Post {...post} key={post.id} />;
      })}
    </div>
  );
};

export default PostWall;
