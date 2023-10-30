import Follow from "@/components/Follow";
import Header from "@/components/Header";
import { AuthOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";

export const revalidate = 0;

const Following = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <>
      <Header title="Following" showIcon />

      {session?.user.following?.map((id) => {
        return <Follow id={id} key={id} />;
      })}
    </>
  );
};

export default Following;
