export interface PostProps {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  userName: string;
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
          <div className="post-main">
            <div className="post-meta">
              <div className="post-user">{props.userName}</div>
              <div className="post-date">{props.createdAt}</div>
            </div>
            <div className="post-content">{props.content}</div>
            <div className="post-interaction">like button</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
