import MyProfile from "@/components/MyProfile";
import Link from "next/link";
import { ReactNode } from "react";
import { ImInfo } from "react-icons/im";
import { MdCallReceived } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "sonner";

export const messageToast = (sender: any, message: any) => {
    toast.custom(
        (t) => (
            <div className="w-full bg-secondary text-secondary-content shadow-lg rounded-lg pointer-events-auto p-2">
                <div className="flex w-full items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <MyProfile image={sender?.dp} />
                    </div>
                    <div className="flex-1 w-40">
                        <p className="text-sm font-medium w-full">
                            New message from
                        </p>
                        <p className="text-sm w-full font-light line-clamp-1 break-words overflow-hidden overflow-ellipsis">
                            {sender?.name}
                        </p>
                    </div>
                    <Link
                        className="_btn-sm p-1 h-full flex justify-center items-center bg-accent text-accent-content"
                        href={`/chat/${message.conversation_id}`}
                        onClick={() => toast.dismiss(t)}
                    >
                        open
                    </Link>
                </div>
            </div>
        ),
        {
            closeButton: true,
        }
    );
};
export const generalToast = (
    message: string,
    theme: string,
    icon?: ReactNode
) => {
    toast.info(message, {
        classNames: {
            toast: `bg-${theme} text-${theme}-content`,
            closeButton: "bg-secondary text-black ",
        },
        icon: icon ?? null,
        closeButton: true,
    });
};
