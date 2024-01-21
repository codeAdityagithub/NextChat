import Sidebar from "@/components/Sidebar";
import SocketConnect from "@/components/socketutils/SocketConnect";

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full flex gap-3 lg:gap-6 justify-between bg-slate-100 p-4 overflow-x-hidden">
            {/* Include shared UI here e.g. a header or sidebar */}
            <SocketConnect />
            <Sidebar />
            {children}
        </div>
    );
}
