import Image from "next/image";

const MyProfile = ({ image }: { image: string | null | undefined }) => {
    return (
        <Image
            src={image ? image : "/account.png"}
            alt="Your account Profile"
            fill
            className="object-cover"
            crossOrigin="anonymous"
        />
    );
};

export default MyProfile;
