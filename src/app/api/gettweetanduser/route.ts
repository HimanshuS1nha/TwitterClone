import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { id, userId } = await req.json();

    const tweet = await prisma.tweets.findUnique({
      where: {
        id,
      },
    });

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    const tweetUser = await prisma.users.findUnique({
      where: {
        id: tweet?.userId,
      },
    });

    return NextResponse.json({ user, tweetUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
