"use client";
import { InvitationType } from "@/types";
import { IoIosNotificationsOutline as NotificationIcon } from "react-icons/io";
import InvitationCard from "./cards/InvitationCard";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import useInvitation from "@/hooks/useInvitation";

type Props = {
    invitations: InvitationType[];
};

const acceptInvite = async (invitation_id: number): Promise<string> => {
    try {
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/invite`,
            { invitation_id },
            { withCredentials: true }
        );
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return "error";
    }
};

const InviteNotifications = ({ invitations }: Props) => {
    const [invites, setInvites] = useInvitation(invitations);

    const handleAccept = async (invitation_id: number) => {
        const res = await acceptInvite(invitation_id);
        if (res === "accepted") {
            setInvites((prev) =>
                prev.filter((invite) => invite.invitation_id != invitation_id)
            );
        }
    };

    return (
        <div className="dropdown dropdown-bottom">
            <div
                tabIndex={0}
                role="button"
                className="p-1.5 rounded-lg relative"
            >
                <NotificationIcon className="text-2xl text-primary-content" />
                <div className="stat-desc text-xs absolute top-0 -right-1 text-accent">
                    {invites.length}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white/60 text-primary-content backdrop-blur-sm rounded-box w-52"
            >
                {invites.map((invite) => (
                    <li
                        key={invite.invitation_id}
                        className="rounded-box cursor-pointer"
                    >
                        <InvitationCard
                            invitation_id={invite.invitation_id}
                            sent_at={invite.sent_at}
                            user_email={invite.user_email}
                            user_name={invite.user_name}
                            handleAccept={handleAccept}
                        />
                    </li>
                ))}
                {invites.length === 0 ? (
                    <li className="rounded-box cursor-pointer p-2">
                        <a className="rounded-box">No Invitations</a>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default InviteNotifications;
