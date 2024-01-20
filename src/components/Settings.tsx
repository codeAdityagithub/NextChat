"use client";
import { GrUserSettings } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

const Settings = () => {
    const handleLogout = () => {
        signOut();
    };
    return (
        <div className="dropdown dropdown-bottom">
            <div
                tabIndex={0}
                role="button"
                className="p-1.5 rounded-lg relative"
            >
                <GrUserSettings className="text-xl text-primary-content" />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white/60 text-primary-content backdrop-blur-sm rounded-box w-52"
            >
                <li
                    className="rounded-box cursor-pointer flex flex-row items-center justify-start p-2 gap-2"
                    onClick={handleLogout}
                >
                    <BiLogOut className="text-xl text-primary-content" />
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default Settings;
