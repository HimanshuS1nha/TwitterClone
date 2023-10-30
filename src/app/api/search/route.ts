import prisma from "@/libs/db";
import { Tweets } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { searchTerm } = await req.json();

    const allUsers = await prisma.users.findMany();

    const users = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );

    let tweets: Tweets[] = [];

    for (let i = 0; i < users.length; i++) {
      const tweet = await prisma.tweets.findMany({
        where: {
          userId: users[i].id,
        },
      });
      tweets = tweets.concat(tweet);
    }

    return NextResponse.json({ users, tweets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
