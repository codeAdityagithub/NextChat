import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import MyProfile from "./MyProfile";
import Image from "next/image";

type Props = {
    id?: string;
    name?: string;
    username?: string;
    dp?: string;
};

const ChatHeaderOptions = ({ id, name, username, dp }: Props) => {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="p-1.5 rounded-lg relative bg-secondary"
            >
                <BsThreeDots className="text-accent text-lg" />
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu z-10 w-60 bg-primary shadow-md shadow-secondary p-3 rounded-md"
            >
                <li className="flex flex-row gap-6">
                    <div className="p-0.5 bg-gradient-to-tr rounded-full from-primary via-red-500 to-green-500">
                        <div className="w-20 h-20 rounded-full relative overflow-hidden">
                            <Image
                                src={dp ?? "/account.png"}
                                alt={`${name} profile picture`}
                                fill
                                className="object-cover"
                                crossOrigin="anonymous"
                                sizes="100px"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center p-2 gap-4 text-primary-content">
                        <div className="text-2xl font-semibold">{name}</div>
                        <div className="text-sm">@{username}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ChatHeaderOptions;
