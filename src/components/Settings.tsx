"use client";
import { GrUserSettings } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

import { signOut } from "next-auth/react";
import Link from "next/link";

const Settings = () => {
    const handleLogout = () => {
        signOut();
    };
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                aria-label="user settings"
                title="user settings"
                className="p-1.5 rounded-lg relative"
            >
                <GrUserSettings className="text-xl text-base-content" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-1 shadow bg-secondary text-secondary-content backdrop-blur-sm rounded-lg w-52 flex flex-col gap-1"
            >
                <li className="cursor-pointer transition-colors hover:bg-primary/60 hover:text-primary-content rounded-md">
                    <Link
                        href={"/chat/settings"}
                        tabIndex={0}
                        className="rounded-box flex flex-row items-center justify-between p-2 gap-2"
                    >
                        Settings
                        <IoSettingsOutline className="text-xl" />
                    </Link>
                </li>
                <li
                    className="rounded-md cursor-pointer transition-colors hover:bg-primary/60 hover:text-primary-content flex flex-row items-center justify-between p-2 gap-2 focus:outline"
                    onClick={handleLogout}
                    tabIndex={0}
                >
                    Logout
                    <BiLogOut className="text-xl" />
                </li>
            </ul>
        </div>
    );
};

export default Settings;
