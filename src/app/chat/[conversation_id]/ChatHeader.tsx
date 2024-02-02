import Image from "next/image";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

import OnlineStatus from "./OnlineStatus";
import GoBack from "../../../components/GoBack";

type Props = {
    id?: string;
    name?: string;
    username?: string;
    has_dp?: boolean;
};

const ChatHeader = ({ id, name, username, has_dp }: Props) => {
    return (
        <div className="w-full h-16 flex items-center gap-3 bg-white py-1 px-3 rounded-lg shadow-md">
            <GoBack />
            <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden">
                <Image
                    src={
                        has_dp
                            ? `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${id}.jpg`
                            : "/account.png"
                    }
                    alt="Acc"
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                    sizes="100px"
                />
            </div>
            <div className="text-lg font-medium flex-1 text-primary-content">
                <div className="font-medium text-primary-content">{name}</div>
                <div className="text-sm font-light line-clamp-1 text-gray-500">
                    @{username} <OnlineStatus username={username!} />
                </div>
            </div>
            <div className="bg-gray-100 py-1 px-2 rounded-lg cursor-pointer">
                <BsThreeDots className="text-primary text-lg" />
            </div>
        </div>
    );
};

export default ChatHeader;
