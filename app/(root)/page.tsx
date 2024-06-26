
import { currentUser } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";
import User from "@/lib/models/user.model";
import ThreadCard from "@/components/cards/ThreadCard";




export default async function Home() {

  const user = await currentUser();

  const result = await fetchPosts(1, 30);


  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10" >
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parent_id}
                content={post.text}
                author={post.author}
                createdAt={post.createdAt}
                community={post.community}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}