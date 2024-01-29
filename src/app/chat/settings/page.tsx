import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import Form from "./Form";

type Props = {};

const page = async (props: Props) => {
    const session = await getServerSession(authOptions);

    return (
        <div className="h-full min-h-full flex-1 md:flex-[2] lg:flex-[3] flex flex-col gap-1 relative">
            <h1 className="w-full text-3xl text-primary-content font-bold">
                Profile Settings
            </h1>
            <div className="container mx-auto mt-8 flex-1">
                <Form
                    names={JSON.parse(session?.user.name!)}
                    profile={session?.user.image}
                />
            </div>
        </div>
    );
};

export default page;
