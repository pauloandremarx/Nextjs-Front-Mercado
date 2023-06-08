import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        nome: { label: "Nome", type: "text", placeholder: "nome" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = new FormData();
        payload.append("nome", credentials.nome);
        payload.append("password", credentials.password);

        const res = await fetch("http://localhost:8080/login/", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {  "Content-Type": "application/json" },
        });

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as User;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  theme: {
    colorScheme: "auto",
    brandColor: "",
  },
  debug: process.env.NODE_ENV === "development",
};
