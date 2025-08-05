import bcrypt, { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { NextAuthOptions, Session } from "next-auth";

import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.Google_Client_id,
      clientSecret: env.Google_secret,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { lable: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }

          //finding the user
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { name: credentials.username },
                { email: credentials.username },
              ],
            },
          });

          //If user is not found
          if (!user) {
            console.log("No user found with the provided credentials");
            return null;
          }
          if (
            !credentials?.username ||
            !credentials?.password ||
            !user.password
          ) {
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("Invalid password");
            return null;
          }
          console.log("User authenticated successfully:");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image:user.image,
            rememberMe: credentials.rememberMe === "true",

          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day default
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      const remember = (await cookies()).get("rememberMe")?.value === "true";
      if (remember) {
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 8;
      } else {
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 + 24;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

export default authOptions;
