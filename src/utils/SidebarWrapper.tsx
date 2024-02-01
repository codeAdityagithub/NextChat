"use client";
import { useParams, usePathname } from "next/navigation";

type Props = {};

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    const { conversation_id: cid } = useParams();
    const pathname = usePathname().split("/").pop();
    return (
        <aside
            className={`${
                cid || pathname === "settings" ? "hidden md:flex" : "flex"
            } h-full min-h-full flex-col flex-1 justify-between`}
        >
            {children}
        </aside>
    );
};

export default SidebarWrapper;
