import { useLoaderData } from "react-router-dom";
import httpClient from "../shared/HttpClient";

export async function loader({ params }) {
  const user = await getUser(params.userId);
  if (!user) {
    throw new Response("", {
      status: 404,
      statusText: "User Not Found",
    });
  }
  return { user };
}

const User = () => {
  const { user } = useLoaderData();
  const postStyles = {
    padding: "0.8rem",
    border: "1px solid black",
    minHeight: "7rem",
    maxHeight: "12rem",
  };

  const dateStyles = {
    color: "ghostwhite",
    fontSize: "12px",
    marginBottom: "0.5rem",
    textAlign: "right",
  };
  return (
    <>
      <div>{user.name}</div>
      <div
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
      </div>
    </>
  );
};

async function getUser(id) {
  const client = httpClient;
  const resp = await client.get(`api/user/${id}`);
  return resp.data;
}

export default User;
