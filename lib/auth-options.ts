import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        try {
          const baseUrl = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
          const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(), // Send data as form-urlencoded
          })

          if (res.status === 406) {
            throw new Error("NOT_VERIFIED");
          }

          if (!res.ok) {
            return null; // For other errors like 401
          }

          const data = await res.json();
          const { access_token, token_type } = data;

          const resUser = await fetch(`${baseUrl}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_type} ${access_token}`,
            },
          });
          const user = await resUser.json();
          if (resUser.ok && user) {
            (await cookies()).set('session', access_token, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
            });
            return {
              ...user,
              image: null,
            }
          }

          return null;
        } catch (error: any) {
          // console.error(error);
          // return null;
          if (error.message === "NOT_VERIFIED") {
            throw new Error("NOT_VERIFIED");
          }
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // No need for explicit casting
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session };
      }
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.email = token.email as string;
        session.user.full_name = token.full_name as string;
        session.user.disabled = token.disabled as boolean;
      }
      return session;
    },
  },
  events: {
    signOut: async () => {
      (await cookies()).delete('session');
    },
  },
};
