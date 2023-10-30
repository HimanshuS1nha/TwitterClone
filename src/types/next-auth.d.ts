import type { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      username: string;
      id: string;
      bannerImage: string;
      bio?: string;
      following?: string[];
      followers?: string[];
      createdAt?: Date;
    };
  }
}
