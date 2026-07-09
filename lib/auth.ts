import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, User } from "./data";
import { defaultRouteByRole } from "./roleRoutes";
import {AuthType} from "@/types/auth";
import {loginWithCredentials} from "@/services/auth/login";

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Google,
        GitHub,
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.accessToken = token.accessToken as string;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
});
