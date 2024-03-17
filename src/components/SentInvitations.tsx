"use client";
import { SentInvites } from "@/types";
import { FaRegPaperPlane } from "react-icons/fa";
import SentInviteCard from "./cards/SentInviteCard";
import { useEffect } from "react";
import { socket } from "@/utils/socket";
import { sentInviteStore } from "./zustand/SentInviteStore";
import useSentInvites from "@/hooks/useSentInvites";

type Props = {
    invitations: SentInvites[];
};

const SentInvitations = ({ invitations }: Props) => {
    const invites = useSentInvites(invitations);

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                title="invitations you sent"
                className="p-1 mt-1 rounded-lg relative indicator"
            >
                <FaRegPaperPlane className="text-base-content" />
                <div className="indicator-item stat-desc text-xs absolute text-accent">
                    {invites.length}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-1 shadow bg-secondary text-secondary-content backdrop-blur-sm rounded-lg w-56 sm:w-64"
            >
                {invites.map((invite) => (
                    <SentInviteCard {...invite} key={invite.username} />
                ))}
                {invites.length === 0 ? (
                    <li className="rounded-md cursor-pointer p-2">
                        <div className="rounded-md">
                            You haven&apos;t sent any invite
                        </div>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default SentInvitations;
