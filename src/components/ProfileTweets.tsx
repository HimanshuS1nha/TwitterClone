"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { Comments, Tweets } from "@prisma/client";

import ProfileTweet from "./ProfileTweet";
import ProfileComment from "./ProfileComment";

const ProfileTweets = ({
  tweets,
  comments,
}: {
  tweets: Tweets[];
  comments: Comments[];
}) => {
  return (
    <Tabs
      aria-label="Options"
      classNames={{
        base: "w-full",
        cursor: "w-full bg-blue-600",
        tabList: "w-full",
      }}
      variant="underlined"
    >
      <Tab key="tweets" title="Tweets">
        {tweets?.map((tweet) => {
          return <ProfileTweet tweet={tweet} key={tweet.id} />;
        })}
      </Tab>
      <Tab key="comments" title="Replies">
        {comments?.map((comment) => {
          return <ProfileComment comment={comment} key={comment.id} />;
        })}
      </Tab>
    </Tabs>
  );
};

export default ProfileTweets;
