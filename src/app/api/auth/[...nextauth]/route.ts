import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // async jwt(token, user) {
    //   if (user) {
    //     token.accessToken = user.accessToken;
    //   }
    //   return token;
    // },
    // async session(session, token) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
});
