import Image from "next/image";
import Link from "next/link";

type Props = {
    userId: string;
};

const UserCard = ({ userId }: Props) => {
    return (
        <Link
            href={`/chat/${userId}`}
            className="w-full h-16 flex items-center gap-3 bg-transparent hover:bg-gray-100 transition-colors rounded-md px-2"
        >
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="flex relative items-start justify-center flex-col h-full">
                <div className="font-medium text-primary-content">
                    Aditya Aditya
                </div>
                <div className="text-sm font-light line-clamp-1 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore.
                </div>
                <div className="absolute text-xs font-light right-4 top-3">
                    9:30
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
