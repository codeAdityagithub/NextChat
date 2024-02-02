"use client";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
    src: string;
    fallback: string;
    alt: string;
};

const ImagewError = ({ src, fallback, alt }: Props) => {
    const [url, setUrl] = useState(src);
    return (
        <Image
            src={url}
            alt={alt}
            fill={true}
            onError={() => setUrl(fallback)}
            className="object-cover"
            crossOrigin="anonymous"
            sizes="100px"
        />
    );
};

export default ImagewError;
