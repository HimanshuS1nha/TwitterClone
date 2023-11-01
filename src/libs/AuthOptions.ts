import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import bcryptjs from "bcryptjs";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as any;
          const user = await prisma.users.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            throw new Error("Email does not exist");
          } else {
            const doesPasswordMatch = await bcryptjs.compare(
              password,
              user.password!
            );
            if (!doesPasswordMatch) {
              throw new Error("Invalid Credentials");
            }

            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        if (session.user) {
          session.user.username = token.username as string;
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.image = token.picture;
          session.user.id = token.id as string;
          session.user.bio = token.bio as string;
          session.user.bannerImage = token.bannerimage as string;
          session.user.following = token.following as string[];
          session.user.followers = token.followers as string[];
          session.user.createdAt = token.createdAt as Date;
        }
      }
      return session;
    },
    async jwt({ token }) {
      const dbUser = await prisma.users.findUnique({
        where: {
          email: token.email!,
        },
      });
      if (!dbUser) {
        await prisma.users.create({
          data: {
            name: token.name!,
            email: token.email!,
            username: "randomname",
            password: "",
          },
        });
        return {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          bio: "",
          picture: null,
          bannerimage: null,
          following: [],
          followers: [],
          createdAt: null,
        };
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        bio: dbUser.bio,
        username: dbUser.username,
        picture: dbUser.image,
        bannerimage: dbUser.bannerImage,
        following: dbUser.following,
        followers: dbUser.followers,
        createdAt: dbUser.createdAt,
      };
    },
  },
};
