"use client";

import Header from "@/components/Header";
import SearchHeader from "@/components/SearchHeader";
import { useState } from "react";
import debounce from "lodash.debounce";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Tweets, Users } from "@prisma/client";
import { Tab, Tabs } from "@nextui-org/react";
import SearchTweet from "@/components/SearchTweet";
import User from "@/components/User";

const Search = () => {
  const [searchUsers, setSearchUsers] = useState<Users[]>([]);
  const [searchTweets, setSearchTweets] = useState<Tweets[]>([]);

  const { mutate: handleSearch } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (searchTerm: string) => {
      const { data } = await axios.post("/api/search", { searchTerm });
      return data;
    },
    onSuccess: (data) => {
      setSearchTweets(data?.tweets);
      setSearchUsers(data?.users);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      }
    },
  });

  const debouncedRequest = debounce(async (searchTerm: string) => {
    handleSearch(searchTerm);
  }, 500);
  return (
    <section className="pb-10">
      <Header title="Search" />
      <SearchHeader onChange={debouncedRequest} />

      <Tabs
        aria-label="Options"
        className="mt-4"
        classNames={{
          base: "w-full",
          cursor: "w-full bg-blue-600",
          tabList: "w-full",
        }}
        variant="underlined"
      >
        <Tab key="users" title="Users">
          {searchUsers.length !== 0 &&
            searchUsers.map((user) => {
              return <User user={user} key={user.id} />;
            })}
        </Tab>
        <Tab key="tweets" title="Tweets">
          {searchTweets.length !== 0 &&
            searchTweets.map((tweet) => {
              return <SearchTweet tweet={tweet} key={tweet.id} />;
            })}
        </Tab>
      </Tabs>
    </section>
  );
};

export default Search;
