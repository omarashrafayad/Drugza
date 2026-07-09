import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        role: string;
        token: string;
    }



    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }
}
