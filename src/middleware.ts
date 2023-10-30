export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/search",
    "/notifications",
    "/profile",
    "/create-tweet",
    "/profile/:id*",
    "/tweet/:id*",
    "/api/:api*",
  ],
};
