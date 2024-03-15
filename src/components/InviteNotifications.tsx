"use client";
import { InviteNotification } from "@/types";
import { IoIosNotificationsOutline as NotificationIcon } from "react-icons/io";
import InvitationCard from "./cards/InvitationCard";
import axios from "axios";
import useInvitation from "@/hooks/useInvitation";

type Props = {
    invitations: InviteNotification[];
    apiAccessToken?: string;
};

const acceptInvite = async (
    invitation_id: number,
    apiAccessToken?: string
): Promise<string> => {
    try {
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/invite`,
            { invitation_id },
            { headers: { Authorization: `Bearer ${apiAccessToken}` } }
        );
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return "error";
    }
};
const rejectInvite = async (
    invitation_id: number,
    apiAccessToken?: string
): Promise<string> => {
    try {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/invite`,
            {
                data: { invitation_id },
                headers: { Authorization: `Bearer ${apiAccessToken}` },
            }
        );
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return "error";
    }
};

const InviteNotifications = ({ invitations, apiAccessToken }: Props) => {
    const [invites, setInvites] = useInvitation(invitations);

    const handleAccept = async (invitation_id: number) => {
        const res = await acceptInvite(invitation_id, apiAccessToken);
        if (res === "accepted") {
            setInvites((prev) =>
                prev.filter((invite) => invite.invitation_id !== invitation_id)
            );
        }
    };
    const handleReject = async (invitation_id: number) => {
        const res = await rejectInvite(invitation_id, apiAccessToken);
        if (res === "rejected") {
            setInvites((prev) =>
                prev.filter((invite) => invite.invitation_id !== invitation_id)
            );
        }
    };

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="p-1 rounded-lg relative indicator"
            >
                <NotificationIcon className="text-2xl text-base-content" />
                <div className="indicator-item stat-desc text-xs absolute text-accent">
                    {invites.length}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-1 shadow bg-secondary text-secondary-content backdrop-blur-sm rounded-lg w-56 sm:w-72"
            >
                {invites.map((invite) => (
                    <li
                        key={invite.invitation_id}
                        className="rounded-md cursor-pointer"
                    >
                        <InvitationCard
                            {...invite}
                            handleAccept={handleAccept}
                            handleReject={handleReject}
                        />
                    </li>
                ))}
                {invites.length === 0 ? (
                    <li className="rounded-md cursor-pointer p-2">
                        <div className="rounded-md">No Invitations</div>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

export default InviteNotifications;
