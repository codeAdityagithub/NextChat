"use client";

import Link from "next/link";

type Props = {
    error: Error;
    reset: () => void;
};

const error = ({ error, reset }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
            <h1 className="text-4xl text-error mb-4">
                Oops! Something went wrong.
            </h1>
            <p className="mb-8">{error.message}</p>
            <div className="">
                <button
                    onClick={reset}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md mr-4 hover:bg-blue-700"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
                >
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
};

export default error;
