import Image from "next/image";

type Props = {};

const AccountCard = (props: Props) => {
    return (
        <div className="w-full h-16 flex items-center gap-3 bg-transparent">
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="flex items-start justify-center flex-col h-full">
                <div className="text-lg font-medium text-primary-content">Aditya Aditya</div>
                <div className="text-sm font-light text-gray-500">
                    @Aditya Aditya
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
