import { User } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
    interface Session {
        accessToken: String,
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string,
        user: User,
    }
}