'use client';

/**
 * Index page.
 * @return {JSX.Element}
 */
export default function Index() {
    return (
        <div className="container">
            <p className="text-4xl">Hello world</p>
            <button
                onClick={() => {
                    throw new Error('Frontend Error!');
                }}
            >
                Test Sentry | Break the world
            </button>
            ;
        </div>
    );
}
