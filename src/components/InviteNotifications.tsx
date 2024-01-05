"use client";
import { InvitationType } from "@/types";
import { IoIosNotificationsOutline as NotificationIcon } from "react-icons/io";

type Props = {
    invitations: InvitationType[];
};

const InviteNotifications = ({ invitations }: Props) => {
    return (
        <div className="dropdown dropdown-bottom">
            <div
                tabIndex={0}
                role="button"
                className="p-1.5 rounded-lg relative"
            >
                <NotificationIcon className="text-2xl text-primary-content" />
                <div className="stat-desc absolute top-0 -right-1 text-accent">
                    {invitations.length}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white text-primary-content backdrop-blur-sm rounded-box w-52"
            >
                {invitations.map((invite) => (
                    <li>
                        <a className="">{invite.user_name}</a>
                    </li>
                ))}
                {invitations.length === 0 ? (
                    <li>
                        <a>No Invitations</a>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default InviteNotifications;
