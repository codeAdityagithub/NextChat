import Image from "next/image";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

import OnlineStatus from "./OnlineStatus";
import GoBack from "./GoBack";

type Props = {
    id?: string;
    name?: string;
    username?: string;
};

const UserHeader = ({ id, name, username }: Props) => {
    return (
        <div className="w-full h-16 flex items-center gap-3 bg-white py-1 px-3 rounded-lg">
            <GoBack />
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="text-lg font-medium flex-1 text-primary-content">
                <div className="font-medium text-primary-content">{name}</div>
                <div className="text-sm font-light line-clamp-1 text-gray-500">
                    @{username}
                    <OnlineStatus username={username!} />
                </div>
            </div>
            <div className="bg-gray-100 py-1 px-2 rounded-lg cursor-pointer">
                <BsThreeDots className="text-primary text-lg" />
            </div>
        </div>
    );
};

export default UserHeader;
