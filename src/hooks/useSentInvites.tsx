"use client";
import { sentInviteStore } from "@/components/zustand/SentInviteStore";
import { InviteNotification, SentInvites } from "@/types";
import { socket } from "@/utils/socket";
import React, { useEffect, useState } from "react";

const useSentInvites = (invitations: SentInvites[]) => {
    const { invites, rejectInvite, initialize } = sentInviteStore();

    useEffect(() => {
        initialize(invitations);
        const audio = new Audio("/inviteSound.mp3");
        function handleReject(invitation_id: number) {
            rejectInvite(invitation_id);
            audio.play();
            console.log("rejected");
        }

        // socket.on("invite_request", handleInvite);
        socket.on("invite_reject", handleReject);

        return () => {
            // socket.off("invite_request", handleInvite);
            socket.off("invite_reject", handleReject);
        };
    }, [invites, invitations]);
    return invites;
};

export default useSentInvites;
