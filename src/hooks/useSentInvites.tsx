"use client";
import { sentInviteStore } from "@/components/zustand/SentInviteStore";
import { SentInvites } from "@/types";
import { socket } from "@/utils/socket";
import { generalToast } from "@/utils/toasts";
import { useEffect, useState } from "react";
import { FcBrokenLink } from "react-icons/fc";

const useSentInvites = (invitations: SentInvites[]) => {
    const [invites, setInvites] = useState(invitations);

    useEffect(() => {
        const audio = new Audio("/inviteSound.mp3");
        function sentInvite(invite: SentInvites) {
            setInvites((prev) => [invite, ...prev]);
        }
        function handleReject(username: string) {
            // console.log(username);
            setInvites((prev) =>
                prev.map((invite) => {
                    if (invite.username === username)
                        return { ...invite, status: "rejected" };
                    return invite;
                })
            );
            audio.play();
            // console.log("rejected");
            generalToast(
                `${username} rejected your invitation.`,
                "secondary",
                <FcBrokenLink size="large" />
            );
        }

        socket.on("send_invite", sentInvite);
        socket.on("invite_reject", handleReject);

        return () => {
            socket.off("send_invite", sentInvite);
            socket.off("invite_reject", handleReject);
        };
    }, [invites, invitations]);
    return invites;
};

export default useSentInvites;
