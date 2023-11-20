import NextAuth from "next-auth";

import { auth } from "./auth.ts";

export default auth;

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
