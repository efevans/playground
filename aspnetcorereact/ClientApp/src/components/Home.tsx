import { useLoaderData } from "react-router-dom";
import httpClient from "../shared/HttpClient";
import Post from "../types/post";
import PostForm from "./PostForm";
import PostWall from "./PostWall";

interface HomeLoadData {
  posts: Post[];
}

export interface PostPostArgs {
  content: string;
}

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const postContent = Object.fromEntries(formData) as PostPostArgs;
  const resp = await createPost(postContent);
  return { resp };
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

  return (
    <>
      <div id="post-wall">
        <PostForm />
        <PostWall posts={posts} />
      </div>
    </>
  );
}

async function getWall() {
  const client = httpClient;
  const resp = await client.get(`api/wall`);
  return resp.data;
}

async function createPost(data: PostPostArgs) {
  const client = httpClient;
  const resp = await client.post("/api/posts", data);
  return resp.data;
}
