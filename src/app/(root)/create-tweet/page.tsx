import CreateTweet from "@/components/CreateTweet";
import Header from "@/components/Header";
import React from "react";

const CreateATweet = () => {
  return (
    <>
      <Header title="Tweet" showIcon />
      <CreateTweet />
    </>
  );
};

export default CreateATweet;
