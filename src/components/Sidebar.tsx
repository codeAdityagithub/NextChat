import InviteUser from "./InviteUser";
import AccountCard from "./cards/AccountCard";
import UserCard from "./cards/UserCard";

type Props = {};

const Sidebar = (props: Props) => {
    return (
        <aside className="flex flex-1 flex-col gap-2 max-w-[350px]">
            <AccountCard />
            <InviteUser />
            <div className="bg-white h-full rounded-lg p-4 shadow-lg">
                <UserCard userId="1" />
            </div>
        </aside>
    );
};

export default Sidebar;
