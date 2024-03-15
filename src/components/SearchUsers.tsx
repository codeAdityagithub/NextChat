import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
    users?: {
        name: string;
        username: string;
        dp?: string | null;
    }[];
    select: (username: string) => void;
};

const SearchUsers = ({ users, select }: Props) => {
    const curuser = useSession().data?.user.name;
    // console.log(users);
    return (
        <div
            tabIndex={0}
            className="w-[250px] sm:w-[350px] empty:opacity-0 transition-opacity max-h-[200px] overflow-y-auto ver_scrollbar flex flex-col gap-0.5 p-1 rounded-lg shadow-lg absolute top-[110%] left-4 bg-secondary text-secondary-content z-10"
        >
            {users &&
                users.map((user) => {
                    if (
                        curuser &&
                        JSON.parse(curuser).username == user.username
                    )
                        return null;
                    return (
                        <div
                            tabIndex={0}
                            className="flex gap-4 hover:bg-accent/30 transition-colors p-2 rounded-md"
                        >
                            <div className="w-10 h-10 rounded-full relative overflow-hidden">
                                <Image
                                    src={user.dp ? user.dp : "/account.png"}
                                    alt="Invitation sender image"
                                    fill
                                    className="object-cover"
                                    crossOrigin="anonymous"
                                    sizes="100px"
                                />
                            </div>
                            <div className="flex flex-1 relative items-start justify-center flex-col h-full w-full">
                                <div className="font-medium text-sm">
                                    {user.name}
                                </div>
                                <div className="text-sm font-light line-clamp-1">
                                    @{user.username}
                                </div>
                            </div>
                            <button
                                title="select user"
                                type="button"
                                aria-label="select user"
                                onClick={() => select(user.username)}
                                className="_btn-sm bg-primary"
                            >
                                send
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default SearchUsers;
