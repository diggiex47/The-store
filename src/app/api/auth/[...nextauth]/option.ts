import bcrypt, { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { NextAuthOptions, Session } from "next-auth";
import async from "../../../Navbar/Navbar";

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
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        try {
          if (!credentials) {
            return null;
          }
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { name: credentials.username },
                { email: credentials.username },
              ],
            },
          });

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
          console.log("User authenticated successfully:", user);
          // return {
          //   user,
          //   // id: user.id,
          //   // name: user.name,
          //   // email: user.email,
          //   // image: user.image,
          // };
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        
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
