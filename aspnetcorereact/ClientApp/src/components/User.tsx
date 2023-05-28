import { useLoaderData } from "react-router-dom";
import httpClient from "../shared/HttpClient";
import PostWall from "./wall/PostWall";
import { PostProps } from "./wall/Post";

export async function loader({ params }: any) {
  const user = await getUser(params.userId);
  if (!user) {
    throw new Response("", {
      status: 418,
      statusText: "User Not Found",
    });
  }
  return { ...user };
}

const User = () => {
  const { name, posts } = useLoaderData() as GetUserResponseProps;
  // const postStyles = {
  //   padding: "0.8rem",
  //   border: "1px solid black",
  //   minHeight: "7rem",
  //   maxHeight: "12rem",
  // };

  // const dateStyles = {
  //   color: "ghostwhite",
  //   fontSize: "12px",
  //   marginBottom: "0.5rem",
  //   textAlign: "right",
  // };
  return (
    <>
      <div>{name}</div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "flex-start",
          alignContent: "stretch",
          backgroundColor: "DarkSlateBlue",
          color: "white",
          // padding: "5px",
          // border: "1px solid black",
          marginTop: "1rem",
          height: "100%",
        }}
      >
        {user.posts.map((post) => {
          const date = new Date(post.createdAt);
          return (
            <div style={postStyles} key={post.id}>
              <div style={dateStyles}>{date.toString()}</div>
              <div>{post.content}</div>
            </div>
          );
        })}
      </div> */}
      <PostWall posts={posts} />
    </>
  );
};

interface GetUserResponseProps {
  name: string;
  posts: PostProps[];
}

async function getUser(id: number): Promise<GetUserResponseProps> {
  const client = httpClient;
  const resp = await client.get(`api/users/${id}`);
  return resp.data as GetUserResponseProps;
}

export default User;
