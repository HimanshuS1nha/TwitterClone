import Follow from "@/components/Follow";
import Header from "@/components/Header";
import { AuthOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";

export const revalidate = 0;

const Followers = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <>
      <Header title="Followers" showIcon />

      {session?.user.followers?.map((id) => {
        return <Follow id={id} key={id} />;
      })}
    </>
  );
};

export default Followers;
