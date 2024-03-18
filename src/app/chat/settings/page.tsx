import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Form from "./Form";
import GoBack from "@/components/GoBack";
import MyProfile from "@/components/MyProfile";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "User settings | NextChat",
    description: "Manage your profile easily and with realtime updates",
};
type Props = {};

const page = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const { name, username } = JSON.parse(session?.user.name!);
    return (
        <div className="h-full min-h-full flex-1 md:flex-[2] xl:flex-[3] flex flex-col gap-1 relative">
            <h1 className="w-full h-20 text-3xl text-base-content font-bold">
                <GoBack />
                Profile Settings
            </h1>
            <div className="w-full overflow-y-auto rounded-md relative flex-1 settings_grid ver_scrollbar">
                <div className="flex flex-row items-center gap-6">
                    <div className="p-1 bg-gradient-to-tr rounded-full from-white via-red-200 to-green-200">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden">
                            <MyProfile image={session?.user.image} />
                        </div>
                    </div>
                    <div className="flex flex-1 w-16 flex-col items-start justify-center p-2 gap-4 text-base-content">
                        <div className="text-2xl font-semibold w-full overflow-ellipsis overflow-hidden">
                            {name}
                        </div>
                        <div className="text-sm">@{username}</div>
                    </div>
                </div>
                <Form name={name} profile={session?.user.image} />
            </div>
        </div>
    );
};

export default page;
