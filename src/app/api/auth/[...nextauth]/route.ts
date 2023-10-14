import NextAuth from "next-auth/next";
import { options } from "./options";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      profile(profile: any) {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: any) {
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      return true;
    },
    async jwt({ token, user, session }) {
      if (user) token.role = user.role;

      return token;
    },
    async session({ session, token, user }) {
      const { iss, ...rest } = session;
      // if (session?.user) {
      //   session.user.role = user.role;
      // }
      return rest;
    },
  },
  // session: {
  //   strategy: "jwt",
  // },
});

export { handler as GET, handler as POST };
