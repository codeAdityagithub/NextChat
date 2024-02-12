"use client";
import { InviteNotification } from "@/types";
import { socket } from "@/utils/socket";
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
            // console.log(invite);
        }
        // function handleReject(invitation_id: number) {
        //     console.log("socket reject");
        //     setInvites((prev) =>
        //         prev.filter((invite) => invite.invitation_id !== invitation_id)
        //     );
        // }
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
