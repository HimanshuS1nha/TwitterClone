import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AuthOptions);

    const { tweetId } = await req.json();

    const comment = await prisma.comments.findUnique({
      where: {
        id: tweetId,
      },
    });

    if (comment?.likedBy.includes(session?.user.id!)) {
      const newComment = comment.likedBy.filter((comment) => {
        return comment !== session?.user.id;
      });

      await prisma.comments.update({
        where: {
          id: tweetId,
        },
        data: {
          likedBy: newComment,
        },
      });

      await prisma.notifications.deleteMany({
        where: {
          userId: comment.userId,
          content: `${session?.user?.name} has followed you`,
          notificationBy: session?.user.id!,
        },
      });
    } else {
      comment?.likedBy.push(session?.user.id!);

      await prisma.comments.update({
        where: {
          id: tweetId,
        },
        data: {
          likedBy: comment?.likedBy,
        },
      });

      const notification = await prisma.notifications.findFirst({
        where: {
          notificationBy: session?.user.id,
          content: `${session?.user.name} liked your comment : ${comment?.content}`,
          userId: comment?.userId,
        },
      });
      if (!notification || session?.user.id !== comment?.userId) {
        await prisma.notifications.create({
          data: {
            notificationBy: session?.user.id!,
            content: `${session?.user.name} liked your comment : ${comment?.content}`,
            userId: comment?.userId!,
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
