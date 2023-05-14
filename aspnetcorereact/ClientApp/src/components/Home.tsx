import { useLoaderData } from "react-router-dom";
import httpClient from "../shared/HttpClient";
import Post from "../types/post";
import PostForm from "./PostForm";

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
  // Move this back to being done in an action so that react router dom will properly run the loader again, this time dont use useactiondata
  // const postPost = async (data: PostPostArgs) => {
  //   const client = httpClient;
  //   const resp = await client.post("/api/posts", data);
  //   return resp.data;
  // };

  return (
    <>
      <div id="post-wall">
        <PostForm
        // makePost={(body: PostPostArgs) => {
        //   console.log(body);
        //   postPost(body);
        //   return body.content;
        // }}
        />
        {posts.map((post: Post) => {
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

async function createPost(data: PostPostArgs) {
  const client = httpClient;
  const resp = await client.post("/api/posts", data);
  return resp.data;
}
