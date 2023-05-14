// @ts-check
import { useActionData, useLoaderData } from "react-router-dom";
import httpClient from "../shared/HttpClient";
import Post from "../types/post";
import PostForm from "./PostForm";

interface HomeLoadData {
  posts: Post[];
}

interface PostData {
  post: Post;
}

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const post = await postPost(updates);
  return { post };
};

export const loader = async () => {
  const posts = await getWall();
  if (!posts) {
    throw new Response("", {
      status: 404,
      statusText: "Failed to get posts",
    });
  }
  return { posts };
};

export default function Home() {
  const { posts } = useLoaderData() as HomeLoadData;
  const { post } = useActionData() as PostData;
  console.log(post);
  return (
    <>
      <div id="post-wall">
        <PostForm />
        {posts.map((post: Post) => {
          // const date = new Date(post.createdAt);
          return (
            <div className="post-border" key={post.id}>
              <div className="post">
                <div className="post-content">{post.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

async function getWall() {
  const client = httpClient;
  const resp = await client.get(`api/wall`);
  return resp.data;
}

async function postPost(data: object) {
  const client = httpClient;
  const resp = await client.post("/api/posts", data);
  return resp.data;
}
