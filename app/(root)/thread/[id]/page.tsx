import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment"
import Thread from "@/lib/models/thread.model";

const Page = async (
    { params }: {
        params: { id: string }
    }
) => {

    if (!params.id) return null;

    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    console.log(params);

    const thread: any = await fetchThreadById(params.id);

    console.log(thread);


    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parent_id}
                    content={thread.text}
                    author={thread.author}
                    createdAt={thread.createdAt}
                    community={thread.community}
                    comments={thread.children}
                />
            </div>

            <div className="mt-7" >
                <Comment
                    threadId={thread._id}
                    currentUserImg={user.imageUrl}
                    currentUserId={JSON.stringify(userInfo._id)}

                />
            </div>

            <div className="mt-18">
                {thread.children.map((childItem: any) => {
                    // <ThreadCard
                    //     key={childItem._id}
                    //     id={childItem._id}
                    //     currentUserId={childItem?.id || ""}
                    //     parentId={childItem.parent_id}
                    //     content={childItem.text}
                    //     author={childItem.author}
                    //     createdAt={childItem.createdAt}
                    //     community={childItem.community}
                    //     comments={childItem.children}
                    //     isComment
                    // />
                    <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parent_id}
                    content={thread.text}
                    author={thread.author}
                    createdAt={thread.createdAt}
                    community={thread.community}
                    comments={thread.children}
                    isComment
                />
                })}
            </div>
        </section>
    )
}

export default Page;