import type { NextAuthConfig } from 'next-auth';
import { signOut } from 'next-auth/react';


// export const authConfig: NextAuthConfig = {
//   pages: {
//     signIn: '/dashboard',
//     signOut: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; 
//       }
//       return true;
//     },
//     redirect: async ({ url, baseUrl }) => {
//       return url.startsWith('/dashboard') ? url : `${baseUrl}/dashboard`;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;

// import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/dashboard',
    signOut: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

    const isLoggedIn = !!auth?.user;
    const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

    if (isOnDashboard) {
      if (isLoggedIn) return true;
      return false;
    } else if (isLoggedIn) {
      console.log(isLoggedIn);
      console.log(Response.error);
      
      Response.redirect(new URL('/dashboard', nextUrl));

    }
    
    return true;

    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith('/dashboard') ? `${baseUrl}/login` : `${baseUrl}/dashboard`;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

