'use client';

import {useRouter} from 'next/router';
import NextHead from 'next/head';

/**
 * Custom 404 Page
 * @return {JSX.Element}
 */
export default function Custom404Page(): JSX.Element {
    const router = useRouter();
    return (
        <>
            <NextHead>
                <title>404 Not Found</title>
            </NextHead>
            <h1 className="text-2xl text-center">
                Oops! Try{' '}
                <button className="text-blue-400" onClick={router.back}>
                    back
                </button>
            </h1>
        </>
    );
}
