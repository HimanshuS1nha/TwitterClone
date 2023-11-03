import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    const tweet = await prisma.tweets.findUnique({
      where: {
        id,
      },
    });

    console.log(tweet);

    const user = await prisma.users.findUnique({
      where: {
        id: tweet?.userId,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
