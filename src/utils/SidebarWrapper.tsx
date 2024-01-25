"use client";
import { useParams } from "next/navigation";

type Props = {};

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    const { conversation_id: cid } = useParams();

    return (
        <aside
            className={`${
                cid ? "hidden md:flex" : "flex"
            } h-full min-h-full flex-col flex-1 `}
        >
            {children}
        </aside>
    );
};

export default SidebarWrapper;
