import Link from "next/link";
import React from "react";

type Props = {};

const NotFound = (props: Props) => {
    return (
        <div className="h-full flex-[2] max-h-screen flex flex-col gap-1 items-center justify-center">
            <h2 className="text-primary-content text-2xl">Not Found</h2>
            <p className="text-primary-content">
                Could not find requested resource
            </p>
            <Link
                href="/chat"
                className="btn btn-sm bg-slate-500 text-secondary-content"
            >
                Go Back
            </Link>
        </div>
    );
};

export default NotFound;
