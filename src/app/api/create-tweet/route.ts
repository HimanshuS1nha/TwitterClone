import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AuthOptions);

    const { content } = await req.json();

    await prisma.tweets.create({
      data: {
        content,
        userId: session?.user.id!,
      },
    });

    return NextResponse.json(
      { message: "Tweet created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Some error occured. Please try again later!",
      },
      { status: 500 }
    );
  }
};
