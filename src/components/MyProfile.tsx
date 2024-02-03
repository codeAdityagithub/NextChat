"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
    const [url, setUrl] = useState("/account.png");
    const session = useSession();
    useEffect(() => {
        console.log(session.data);
        session.status === "authenticated" &&
            session.data.user.image &&
            setUrl(session.data.user.image.split("?")[0]);
    }, [session]);
    return (
        <Image
            src={url}
            alt="My profile picture"
            fill={true}
            className="object-cover"
            crossOrigin="anonymous"
            sizes="100px"
        />
    );
};

export default MyProfile;
