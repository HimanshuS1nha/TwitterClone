import { AuthOptions } from "@/libs/AuthOptions";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AuthOptions);

    const editprofileValidator = z.object({
      name: z
        .string()
        .min(5, { message: "Name must be atleast 5 characters long" }),
      username: z
        .string()
        .min(5, { message: "Username must be atleast 5 characters long" }),
      email: z.string().email(),
      bio: z
        .string()
        .max(200, { message: "Bio must be atmost 200 characters long" }),
      image: z.string().url().nullish(),
      bannerImage: z.string().url().nullish(),
    });

    const data: z.infer<typeof editprofileValidator> = await req.json();

    const { success: zodSuccess } = editprofileValidator.safeParse(data);
    if (!zodSuccess) {
      return NextResponse.json(
        { error: "Please enter correct values" },
        { status: 422 }
      );
    }

    const { bannerImage, email, image, name, username, bio } = data;

    await prisma.users.update({
      where: {
        email: session?.user.email as string,
      },
      data: {
        name,
        username,
        email,
        bio,
        image,
        bannerImage,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
