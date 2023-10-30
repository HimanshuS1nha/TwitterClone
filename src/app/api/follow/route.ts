import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  try {
    const { id }: { id: string } = await req.json();

    const session = await getServerSession(AuthOptions);

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    const followingUser = await prisma.users.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    if (user?.followers.includes(session?.user.id!)) {
      const newFollowers = user?.followers.filter((id) => {
        return id !== session?.user.id;
      }) as string[];

      const newFollowing = followingUser?.following.filter((id) => {
        return id !== user.id;
      }) as string[];

      await prisma.users.update({
        where: {
          id: session?.user.id,
        },
        data: {
          following: newFollowing,
        },
      });
      await prisma.users.update({
        where: {
          id,
        },
        data: {
          followers: newFollowers,
        },
      });
    } else {
      user?.followers.push(session?.user.id!);
      followingUser?.following.push(id);

      await prisma.users.update({
        where: {
          id: session?.user.id,
        },
        data: {
          following: followingUser?.following,
        },
      });
      await prisma.users.update({
        where: {
          id,
        },
        data: {
          followers: user?.followers,
        },
      });

      const notification = await prisma.notifications.findFirst({
        where: {
          userId: id,
          content: `${session?.user?.name} has followed you`,
          notificationBy: session?.user.id!,
        },
      });

      if (!notification) {
        await prisma.notifications.create({
          data: {
            userId: id,
            content: `${session?.user?.name} has followed you`,
            notificationBy: session?.user.id!,
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Following/Unfollowed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
