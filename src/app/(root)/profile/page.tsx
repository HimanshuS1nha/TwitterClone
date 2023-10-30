import { getServerSession } from "next-auth";
import { AuthOptions } from "@/libs/AuthOptions";
import ProfileTweets from "@/components/ProfileTweets";
import prisma from "@/libs/db";

import ProfileImage from "@/components/ProfileImage";
import ProfileDetails from "@/components/ProfileDetails";
import EditProfileModal from "@/components/EditProfileModal";

export const revalidate = 0;

const Profile = async () => {
  const session = await getServerSession(AuthOptions);
  const tweets = await prisma.tweets.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  const comments = await prisma.comments.findMany({
    where: {
      userId: session?.user.id!,
    },
  });
  return (
    <section className="pb-10">
      <ProfileImage
        image={session?.user.image || "/user.jpg"}
        bannerImage={session?.user.bannerImage || ""}
      />

      <EditProfileModal />

      <div className="mt-20" />

      <ProfileDetails
        name={session?.user.name!}
        username={session?.user.username!}
        id={session?.user.id!}
        joiningDate={session?.user.createdAt!}
        noOfFollowers={session?.user.followers?.length!}
        noOfFollowing={session?.user.following?.length!}
        bio={session?.user.bio!}
      />

      <ProfileTweets tweets={tweets} comments={comments} />
    </section>
  );
};

export default Profile;
