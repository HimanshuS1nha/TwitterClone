import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const addUserValidator = z.object({
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
      image: z.string().url().nullable(),
      bannerImage: z.string().url().nullable(),
      password: z.string(),
    });

    const data: z.infer<typeof addUserValidator> = await req.json();

    const { success: zodSuccess } = addUserValidator.safeParse(data);
    if (!zodSuccess) {
      return NextResponse.json(
        { error: "Please enter correct details" },
        { status: 422 }
      );
    }

    const { bannerImage, email, image, name, password, username, bio } = data;

    const doesEmailExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    const doesUsernameExists = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (doesEmailExists || doesUsernameExists) {
      return NextResponse.json(
        { error: "Email/Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.users.create({
      data: {
        email,
        name,
        username,
        bannerImage,
        bio,
        image,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully" },
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
