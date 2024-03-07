import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TbMessageForward } from "react-icons/tb";
import { useForwardStore } from "./zustand/ForwardMessageDialogStore";

type Props = {
    messageType: "text" | "image";
    messageContent: string;
};

const OtherPersonMessageDropdown = ({ messageType, messageContent }: Props) => {
    const toggleDialog = useForwardStore((state) => state.toggleDialog);
    const setForwardContent = useForwardStore(
        (state) => state.setForwardContent
    );

    return (
        <div className="dropdown dropdown-right dropdown-top">
            <div
                tabIndex={0}
                role="button"
                aria-label="message options"
                className="text-lg"
            >
                <BsThreeDotsVertical />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-1 shadow-md shadow-black bg-neutral text-neutral-content rounded-lg w-max "
            >
                <li tabIndex={0} className="hover:bg-secondary/60 rounded-md">
                    <button
                        aria-label="delete message"
                        className="p-2 flex justify-between"
                        onClick={() => {
                            setForwardContent(messageContent, messageType);
                            toggleDialog();
                        }}
                    >
                        Forward Message <TbMessageForward className="text-lg" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default OtherPersonMessageDropdown;
