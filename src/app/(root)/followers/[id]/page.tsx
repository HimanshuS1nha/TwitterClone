import Follow from "@/components/Follow";
import Header from "@/components/Header";
import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ParamsProps } from "@/types";

export const revalidate = 0;

const FollowersPage = async ({ params: { id } }: ParamsProps) => {
  const session = await getServerSession(AuthOptions);

  if (session?.user.id === id) {
    redirect("/followers");
  }

  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return (
    <>
      <Header title="Followers" showIcon />

      {user?.followers?.map((id) => {
        return <Follow id={id} key={id} />;
      })}
    </>
  );
};

export default FollowersPage;
