"use client";
import { GrUserSettings } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const ChatHeaderOptions = () => {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="p-1.5 rounded-lg relative bg-accent"
            >
                <BsThreeDots className="text-primary text-lg" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white/60 text-primary-content backdrop-blur-sm rounded-box w-52"
            >
                <li className="cursor-pointer">
                    <Link
                        href={"/chat"}
                        tabIndex={0}
                        className="rounded-box flex flex-row items-center justify-between p-2 gap-2"
                    >
                        See Profile
                        <CgProfile className="text-xl text-primary-content" />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ChatHeaderOptions;
