"use client";

import Link from "next/link";

type Props = {
    error: Error;
    reset: () => void;
};

const error = ({ error, reset }: Props) => {
    return (
        <div className=" md:flex-[2] xl:flex-[3] flex flex-col items-center justify-center h-full bg-base-300">
            <h1 className="text-4xl text-error mb-4">
                Oops! Something went wrong.
            </h1>
            <p className="mb-8">{error.message}</p>
            <div className="">
                <button
                    onClick={reset}
                    className="bg-primary text-primary-content px-6 py-3 rounded-md mr-4 hover:bg-primary/80"
                >
                    Try Again
                </button>
                <Link
                    href="/chat"
                    className="bg-accent text-accent-content px-6 py-3 rounded-md mr-4 hover:bg-accent/80"
                >
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
};

export default error;
