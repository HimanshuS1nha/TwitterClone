import CreateTweetLoading from "@/components/CreateTweetLoading";
import Header from "@/components/Header";

const CreateTweetPageLoading = () => {
  return (
    <>
      <Header title="Tweet" showIcon />
      <CreateTweetLoading />
    </>
  );
};

export default CreateTweetPageLoading;
