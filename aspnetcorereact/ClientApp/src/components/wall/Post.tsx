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
          <div className="post-icon centered">
            <img
              alt="logo"
              style={{ height: "4.5rem", width: "4.0rem" }}
              src={require("../pomubrand.png")}
            ></img>
          </div>
          <div className="post-content">{props.content}</div>
        </div>
      </div>
    </>
  );
};

export default Post;
