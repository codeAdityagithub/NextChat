"use client";
import InvitationCard from "@/components/cards/InvitationCard";
import { InviteNotification } from "@/types";
import { socket } from "@/utils/socket";
import { generalToast } from "@/utils/toasts";
import React, { useEffect, useState } from "react";

type Props = {
    invitations: InviteNotification[];
};

const useInvitation = (invitations: InviteNotification[]) => {
    const [invites, setInvites] = useState<InviteNotification[]>(invitations);
    useEffect(() => {
        const audio = new Audio("/inviteSound.mp3");
        function handleInvite(invite: InviteNotification) {
            setInvites((prev) => [invite, ...prev]);
            audio.play();
            generalToast(
                `You have a new invitation from ${invite.name}.`,
                "success"
            );
            // console.log(invite);
        }

        socket.on("invite_request", handleInvite);
        // socket.on("invite_reject", handleReject);

        return () => {
            socket.off("invite_request", handleInvite);
            // socket.off("invite_reject", handleReject);
        };
    }, [invites]);
    return [invites, setInvites] as const;
};

export default useInvitation;
