import prisma from "@/libs/db";
import SuggestionItem from "./SuggestionItem";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/libs/AuthOptions";

export const revalidate = 0;

const Suggestions = async () => {
  const user1 = await prisma.users.findUnique({
    where: {
      username: "HimanshuS1nha",
    },
  });

  const user2 = await prisma.users.findUnique({
    where: {
      username: "Khushi",
    },
  });

  const session = await getServerSession(AuthOptions);
  return (
    <div className="w-[25%] bg-neutral-200 dark:bg-neutral-800 h-fit my-4 rounded-lg py-3 hidden lg:block ml-4">
      <p className="text-xl my-3 mx-4 font-semibold">Who to follow</p>
      <SuggestionItem
        name={user1?.name!}
        username={user1?.username!}
        key={user1?.id}
        image={user1?.image!}
        userId={user1?.id!}
        followed={user1?.followers.includes(session?.user.id!)!}
      />
      <SuggestionItem
        name={user2?.name!}
        username={user2?.username!}
        key={user2?.id}
        image={user2?.image!}
        userId={user2?.id!}
        followed={user2?.followers.includes(session?.user.id!)!}
      />
    </div>
  );
};

export default Suggestions;
