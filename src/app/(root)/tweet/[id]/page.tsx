import { Tweets, Users } from "@prisma/client";
import { getServerSession } from "next-auth";

import Header from "@/components/Header";
import Tweet from "@/components/Tweet";
import prisma from "@/libs/db";
import { AuthOptions } from "@/libs/AuthOptions";
import CommentForm from "@/components/CommentForm";
import Comment from "@/components/Comment";
import { ParamsProps } from "@/types";

export const revalidate = 0;

const TweetPage = async ({ params: { id } }: ParamsProps) => {
  const tweet = await prisma.tweets.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
    },
  });
  const user = await prisma.users.findUnique({
    where: {
      id: tweet?.userId,
    },
    select: {
      username: true,
    },
  });
  const comments = await prisma.comments.findMany({
    where: {
      tweetId: tweet?.id!,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const session = await getServerSession(AuthOptions);
  return (
    <section className="pb-10">
      <Header title="Tweet" showIcon />
      <Tweet tweet={tweet as Tweets} />
      <CommentForm image={session?.user.image || "/user.jpg"} id={tweet?.id!} />
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            key={comment.id}
            username={user?.username!}
          />
        );
      })}
    </section>
  );
};

export default TweetPage;
