import { InvitationType } from "@/types";
import { socket } from "@/utils/socket";
import React, { useEffect, useState } from "react";

type Props = {
    invitations: InvitationType[];
};

const useInvitation = (invitations: InvitationType[]) => {
    const [invites, setInvites] = useState<InvitationType[]>(invitations);

    useEffect(() => {
        function handleInvite(invite: InvitationType) {
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
