import axios from "axios";
import imageCompression from "browser-image-compression";

type uploadImageReturn = {
    status: "accepted" | "error";
};

export default async function (url: string): Promise<uploadImageReturn> {
    try {
        const dataUrl = (
            await axios.get(url, {
                responseType: "blob",
            })
        ).data;
        const file = new File(dataUrl, "file");
        // const image = await imageCompression.getFilefromDataUrl(
        //     dataUrl,
        //     "googleProfile"
        // );
        const data = new FormData();
        data.set("profilePicture", file);
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload`,
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (res.status === 200) {
            return { status: "accepted" };
        }
        return { status: "error" };
    } catch (error: any) {
        console.log(error.message);
        return { status: "error" };
    }
}
