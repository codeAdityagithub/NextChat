import { InviteNotification } from "@/types";
import { socket } from "@/utils/socket";
import React, { useEffect, useState } from "react";

type Props = {
    invitations: InviteNotification[];
};

const useInvitation = (invitations: InviteNotification[]) => {
    const [invites, setInvites] = useState<InviteNotification[]>(invitations);

    useEffect(() => {
        function handleInvite(invite: InviteNotification) {
            setInvites((prev) => [...prev, invite]);
            // console.log(invite);
        }
        socket.on("invite_request", handleInvite);

        return () => {
            socket.off("invite_request", handleInvite);
        };
    }, [invites, socket]);
    return [invites, setInvites] as const;
};

export default useInvitation;
