"use client";
import { useParams } from "next/navigation";

type Props = {};

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    const { conversation_id: cid } = useParams();

    return (
        <aside
            className={`${
                cid ? "hidden sm:flex" : "flex"
            } flex-1 flex-col max-w-[350px]`}
        >
            {children}
        </aside>
    );
};

export default SidebarWrapper;
