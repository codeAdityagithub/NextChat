import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Form from "./Form";
import GoBack from "@/components/GoBack";
import MyProfile from "@/components/MyProfile";

type Props = {};

const page = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const { name, username } = JSON.parse(session?.user.name!);
    return (
        <div className="h-full min-h-full flex-1 md:flex-[2] lg:flex-[3] flex flex-col gap-1 relative">
            <h1 className="w-full h-20 text-3xl text-primary-content font-bold">
                <GoBack />
                Profile Settings
            </h1>
            <div className="w-full overflow-y-auto bg-white relative flex-1 settings_grid ver_scrollbar">
                <div className="flex flex-row gap-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white">
                        <MyProfile image={session?.user.image} />
                    </div>
                    <div className="flex flex-col items-start justify-center p-2 gap-4 text-primary-content">
                        <div className="text-2xl font-semibold">{name}</div>
                        <div className="text-sm text-primary-content/60">
                            @{username}
                        </div>
                    </div>
                </div>
                <Form
                    name={name}
                    username={username}
                    profile={session?.user.image}
                />
            </div>
        </div>
    );
};

export default page;
