import AccountCard from "./cards/AccountCard";
import UserCard from "./cards/UserCard";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <aside className="flex flex-1 flex-col gap-2">
            <AccountCard />
            <div className="bg-white h-full rounded-lg p-4 max-w-[350px]">
                <UserCard userId="1" />
            </div>
        </aside>
    );
};

export default Sidebar;
