import Image from "next/image";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

type Props = {};

const UserHeader = (props: Props) => {
    return (
        <div className="w-full h-16 flex items-center gap-3 bg-white py-1 px-3 rounded-lg">
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="text-lg font-medium flex-1 text-primary-content">
                Aditya Aditya
            </div>
            <div className="bg-gray-100 py-1 px-2 rounded-lg cursor-pointer">
                <BsThreeDots className="text-primary text-lg" />
                
            </div>
        </div>
    );
};

export default UserHeader;
