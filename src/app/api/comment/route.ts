import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AuthOptions);

    const commentValidator = z.object({
      id: z.string(),
      comment: z
        .string()
        .max(280, { message: "Comment must not exceed 280 characters" }),
    });

    const data: z.infer<typeof commentValidator> = await req.json();

    const { success: zodSuccess } = commentValidator.safeParse(data);
    if (!zodSuccess) {
      return NextResponse.json(
        { error: "Please enter 280 characters maximum" },
        { status: 422 }
      );
    }

    const { id, comment } = data;

    const tweet = await prisma.tweets.findUnique({
      where: {
        id,
      },
    });

    await prisma.comments.create({
      data: {
        content: comment,
        tweetId: id,
        userId: session?.user.id!,
      },
    });

    const notification = await prisma.notifications.findFirst({
      where: {
        notificationBy: session?.user.id,
        content: `${session?.user.name} commented on your tweet : ${tweet?.content}`,
        userId: tweet?.userId,
      },
    });
    if (!notification && session?.user.id !== tweet?.userId) {
      await prisma.notifications.create({
        data: {
          notificationBy: session?.user.id!,
          content: `${session?.user.name} commented on your tweet : ${comment}`,
          userId: tweet?.userId!,
        },
      });
    }

    return NextResponse.json(
      { message: "Reply added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
