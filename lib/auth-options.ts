import connectToDb from '@/lib/mongodb';
import User from '@/models/user';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          await connectToDb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatches = await bcrypt.compare(password, user.password);

          if (!passwordMatches) {
            return null;
          }

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // No need for explicit casting
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session };
      }
      return { ...token, ...user };
    },
    // async redirect({ url, baseUrl }) {
    //   console.log(url, baseUrl);
    //   // Ensure the redirect URL is not the same as the signIn page to avoid infinite loop
    //   if (url.startsWith(baseUrl) && url !== `${baseUrl}/login`) {
    //     return url;
    //   }
    //   return baseUrl;
    // },
  },
};