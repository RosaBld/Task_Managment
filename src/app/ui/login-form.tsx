'use client';

import {lusitana } from '@/app/ui/fonts';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="">
            <div className="">
                <h1 className="">Login</h1>
                <div className="">
                    <label htmlFor="email" className="">
                        Email:
                    </label>
                    <div className="">
                        <input
                            className=""
                            id="email"
                            type="email"
                            name="email"
                            placeholder='Enter your email please'
                            required
                        />                        
                    </div>
                </div>
                <div className="">
                    <label htmlFor="password" className="">
                        Password:
                    </label>
                    <div className="">
                        <input
                            className=""
                            id="password"
                            type="password"
                            name="password"
                            placeholder='Enter your password please'
                            required
                        />                        
                    </div>
                </div>
                <LoginButton />
                <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
                >
                {errorMessage && (
                    <>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
                </div>
            </div>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button className="" aria-disabled={pending}>
            Login In
        </button>
    )
}