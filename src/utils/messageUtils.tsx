import axios from "axios";
import imageCompression from "browser-image-compression";

type MutationParams = {
    otherPersonId: string;
    apiAccessToken?: string;
    conversation_id: string | string[];
    message: string;
};
type ImageMutationParams = {
    otherPersonId: string;
    apiAccessToken?: string;
    conversation_id: string | string[];
    file: File;
};

export const sendMessage = async ({
    message,
    conversation_id,
    otherPersonId,
    apiAccessToken,
}: MutationParams) => {
    await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/message`,
        { message, otherPersonId, conversation_id },
        {
            headers: {
                Authorization: `Bearer ${apiAccessToken}`,
            },
        }
    );
};
export const sendImage = async ({
    file,
    conversation_id,
    otherPersonId,
    apiAccessToken,
}: ImageMutationParams) => {
    const compressedImage = await imageCompression(file, {
        useWebWorker: true,
        maxWidthOrHeight: 1000,
        maxSizeMB: 0.1,
    });

    const data = new FormData();
    data.set("image", compressedImage);
    data.set("otherPersonId", otherPersonId);
    data.set("conversation_id", conversation_id as string);

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message/image`, data, {
        headers: {
            Authorization: `Bearer ${apiAccessToken}`,
        },
    });
};
