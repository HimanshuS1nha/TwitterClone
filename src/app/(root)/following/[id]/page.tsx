import Follow from "@/components/Follow";
import Header from "@/components/Header";
import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";
import { ParamsProps } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const FollowingPage = async ({ params: { id } }: ParamsProps) => {
  const session = await getServerSession(AuthOptions);

  if (session?.user.id === id) {
    redirect("/following");
  }

  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return (
    <>
      <Header title="Following" showIcon />

      {session?.user.following?.map((id) => {
        return <Follow id={id} key={id} />;
      })}
    </>
  );
};

export default FollowingPage;
