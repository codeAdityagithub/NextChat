import Image from "next/image";

const MyProfile = ({ image }: { image: string | null | undefined }) => {
    // const [url, setUrl] = useState("/account.png");
    // const session = useSession();
    // useEffect(() => {
    //     session.status === "authenticated" &&
    //         session.data.user.image &&
    //         setUrl(session.data.user.image.split("?")[0]);
    // }, [session]);
    return (
        // <Image
        //     src={url}
        //     alt="My profile picture"
        //     fill={true}
        //     className={"object-cover" + (className ?? "")}
        //     crossOrigin="anonymous"
        //     sizes="100px"
        // />
        <img
            src={image ? image : "/account.png"}
            alt="Your account Profile"
            className="object-cover absolute inset-0"
            crossOrigin="anonymous"
        />
    );
};

export default MyProfile;
