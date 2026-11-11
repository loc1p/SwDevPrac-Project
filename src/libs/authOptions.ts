import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import userLogin from "@/libs/userLogIn"

export const authOptions: AuthOptions = {
  providers: [
    // authentication provider use credentials provider
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await userLogin(credentials.email, credentials.password);

        // backend returns { success, data: { id, name, email, role, token } }
        if (user && user.success) {
          return { ...user.data, _id: user.data.id }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id ?? "",
        name: token.name ?? "",
        email: token.email ?? "",
        role: token.role ?? "member",
        token: token.token ?? "",
      }
      return session
    }
  }
}
