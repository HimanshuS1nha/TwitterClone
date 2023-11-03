import User from "./User";
import prisma from "@/libs/db";

const Follow = async ({ id }: { id: string }) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return <User user={user!} />;
};

export default Follow;
