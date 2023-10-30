import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AuthOptions);

    const { tweetId } = await req.json();

    const tweet = await prisma.tweets.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (tweet?.likedBy.includes(session?.user.id!)) {
      const newTweet = tweet.likedBy.filter((tweet) => {
        return tweet !== session?.user.id;
      });

      await prisma.tweets.update({
        where: {
          id: tweetId,
        },
        data: {
          likedBy: newTweet,
        },
      });

      await prisma.notifications.deleteMany({
        where: {
          notificationBy: session?.user.id,
          content: `${session?.user.name} liked your tweet : ${tweet?.content}`,
          userId: tweet?.userId,
        },
      });
    } else {
      tweet?.likedBy.push(session?.user.id!);

      await prisma.tweets.update({
        where: {
          id: tweetId,
        },
        data: {
          likedBy: tweet?.likedBy,
        },
      });

      const notification = await prisma.notifications.findFirst({
        where: {
          notificationBy: session?.user.id,
          content: `${session?.user.name} liked your tweet : ${tweet?.content}`,
          userId: tweet?.userId,
        },
      });
      if (!notification || session?.user.id !== tweet?.userId) {
        await prisma.notifications.create({
          data: {
            notificationBy: session?.user.id!,
            content: `${session?.user.name} liked your tweet : ${tweet?.content}`,
            userId: tweet?.userId!,
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Liked added/removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
