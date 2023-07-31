import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@auth/firebase-adapter";


import { db } from "../../../firebase.config"

export default NextAuth({
 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter(db),
  callbacks: {
    async signIn(user, account, profile) {
      const isAdmin = false;
      user.user.isAdmin = isAdmin;

      return true;
    },
    async jwt(token, user) {

      if (user) {
        token.user = {
          ...token.user,
          isAdmin: user.isAdmin || false,
        };
      }

      return token;
    },
    async session(session, token) {

      if (token?.user) {
        session.user = {
          ...session.user,
          isAdmin: token.user.isAdmin || false,
        };
      }

      return session;
    }
  },
  secret:process.env.NEXT_PUBLIC_SECRET
})
