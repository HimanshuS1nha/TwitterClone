import CreateTweetLoading from "@/components/CreateTweetLoading";
import Header from "@/components/Header";
import TweetLoading from "@/components/TweetLoading";

const Loading = () => {
  return (
    <div className="text-4xl">
      <Header title="Home" />
      <CreateTweetLoading />
      {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => {
        return <TweetLoading key={id} />;
      })}
    </div>
  );
};

export default Loading;
