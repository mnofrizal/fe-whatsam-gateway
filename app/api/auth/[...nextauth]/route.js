import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log("Attempting to authenticate user:", credentials.email);

          const response = await fetch(
            `${process.env.BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();
          console.log("Backend response status:", response.status);
          console.log("Backend response data:", data);

          if (response.ok && data.success) {
            const user = {
              id: data.data.user.id,
              name: data.data.user.name,
              email: data.data.user.email,
              role: data.data.user.role,
              tier: data.data.user.tier,
              isActive: data.data.user.isActive,
              token: data.data.token,
              expiresIn: data.data.expiresIn,
            };
            console.log("Authentication successful for user:", user.email);
            return user;
          }

          console.log(
            "Authentication failed:",
            data.message || "Unknown error"
          );
          return null;
        } catch (error) {
          console.error("Auth error:", error.message);
          console.error("Full error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tier = user.tier;
        token.isActive = user.isActive;
        token.accessToken = user.token;
        token.expiresIn = user.expiresIn;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.tier = token.tier;
      session.user.isActive = token.isActive;
      session.accessToken = token.accessToken;
      session.expiresIn = token.expiresIn;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
