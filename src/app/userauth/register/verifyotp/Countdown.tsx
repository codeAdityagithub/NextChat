// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
    time: number;
};

const Countdown = ({ time: init }: Props) => {
    // console.log(time);
    const router = useRouter();
    const [time, setTime] = useState(init);
    useEffect(() => {
        const interval = setInterval(() => setTime((t) => t - 1), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (time <= 0) router.refresh();
    }, [time, router]);
    return (
        <span className="countdown font-mono text-2xl">
            <span style={{ "--value": Math.floor(time / 60) }}></span>:
            <span style={{ "--value": time % 60 }}></span>
        </span>
    );
};

export default Countdown;
