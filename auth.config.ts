import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; 
            }
            return true;
        },
        redirect: async ({ url, baseUrl }) => {
            return url.startsWith('/dashboard') ? url : `${baseUrl}/dashboard`;
        },
    },
    providers: [],
} satisfies NextAuthConfig;

// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//     const isLoggedIn = !!auth?.user;
//     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//     if (isOnDashboard) {
//       if (isLoggedIn) return true;
//       return false; 
//     } else if (isLoggedIn) {
//       return Response.redirect(new URL('/dashboard', nextUrl));
//     }

//     return true;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;