export interface PostProps {
  id: number;
  content: string;
  createdAt: string;
}

const Post = (props: PostProps) => {
  return (
    <>
      <div className="post-border">
        <div className="post">
          <div className="post-content">{props.content}</div>
        </div>
      </div>
    </>
  );
};

export default Post;
