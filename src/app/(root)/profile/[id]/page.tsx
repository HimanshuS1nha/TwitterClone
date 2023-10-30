import { getServerSession } from "next-auth";

import prisma from "@/libs/db";
import FollowButton from "@/components/FollowButton";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileImage from "@/components/ProfileImage";
import { ParamsProps } from "@/types";
import { AuthOptions } from "@/libs/AuthOptions";
import { redirect } from "next/navigation";

export const revalidate = 0;

const ProfilePage = async ({ params: { id } }: ParamsProps) => {
  const session = await getServerSession(AuthOptions);

  if (session?.user.id === id) {
    redirect("/profile");
  }

  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return (
    <section className="pb-10">
      <ProfileImage bannerImage={user?.bannerImage!} image={user?.image!} />

      <div className="m-3">
        <FollowButton
          id={id}
          followed={user?.followers.includes(session?.user.id!)!}
        />
      </div>

      <div className="mt-20" />

      <ProfileDetails
        name={user?.name!}
        id={id}
        username={user?.username!}
        joiningDate={user?.createdAt!}
        bio={user?.bio!}
        noOfFollowers={user?.followers.length!}
        noOfFollowing={user?.following.length!}
      />
    </section>
  );
};

export default ProfilePage;
