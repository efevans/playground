import { useState } from "react";
import httpClient from "../../shared/HttpClient";

export interface PostProps {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  userName: string;
  likeCount: number;
  likedByMe: boolean;
}

const Post = (props: PostProps) => {
  const [likedByMe, setLikedByMe] = useState(props.likedByMe);
  const [localLikeChange, setLocalLikeChange] = useState(0);

  const likedImageSrc = require("./HeartLiked.png");
  const unlikedImageSrc = require("./HeartUnliked.png");

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
            <div className="post-interaction">
              <div className="post-interaction-container highlightable">
                <img
                  alt="like"
                  style={{ minHeight: "100%", cursor: "pointer" }}
                  src={likedByMe ? likedImageSrc : unlikedImageSrc}
                  onClick={async () => {
                    console.log("Liked this post!");

                    if (likedByMe) {
                      const response = await postUnlike({ postId: props.id });
                      setLikedByMe(response.postIsLiked);
                      setLocalLikeChange(localLikeChange - 1);
                    } else {
                      const response = await postLike({ postId: props.id });
                      setLikedByMe(response.postIsLiked);
                      setLocalLikeChange(localLikeChange + 1);
                    }
                  }}
                ></img>
                <div>{props.likeCount + localLikeChange}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface PostLikeRequestProps {
  postId: number;
}

interface PostLikeResponseProps {
  postId: number;
  postIsLiked: boolean;
}

async function postLike(
  data: PostLikeRequestProps
): Promise<PostLikeResponseProps> {
  return await postLikeRequest("like", data);
}

async function postUnlike(
  data: PostLikeRequestProps
): Promise<PostLikeResponseProps> {
  return await postLikeRequest("unlike", data);
}

async function postLikeRequest(
  url: string,
  data: PostLikeRequestProps
): Promise<PostLikeResponseProps> {
  const client = httpClient;
  const resp = await client.post(`/api/posts/${data.postId}/${url}`);
  return resp.data as PostLikeResponseProps;
}

export default Post;
