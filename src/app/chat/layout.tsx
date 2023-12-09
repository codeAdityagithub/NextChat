import Sidebar from "@/components/Sidebar";

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex gap-3 lg:gap-6 justify-center bg-slate-100 p-4">
            {/* Include shared UI here e.g. a header or sidebar */}
            <Sidebar />
            {children}
        </div>
    );
}
