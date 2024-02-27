import { useSession } from 'next-auth/react';

export function LoginInfo() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return null; // Optionally return a loading indicator while the session is loading.
    }

    if (!session) {
        return null; // If no session is found, the user is not authenticated.
    }

    return (
        <div>
            <p>{session.user?.name}</p>
        </div>
    );
}