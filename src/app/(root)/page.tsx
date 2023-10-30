import CreateTweet from "@/components/CreateTweet";
import Header from "@/components/Header";
import Tweet from "@/components/Tweet";
import prisma from "@/libs/db";

export const revalidate = 0;

export default async function Home() {
  const tweets = await prisma.tweets.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });
  return (
    <section className="pb-10">
      <Header title="Home" />
      <CreateTweet />
      {tweets.map((tweet) => {
        return <Tweet tweet={tweet} key={tweet.id} />;
      })}
    </section>
  );
}
