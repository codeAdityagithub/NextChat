import { Message } from "@/dbtypes";
import { queryClient } from "@/utils/ReactQueryProvider";
// import { queryClient } from "@/utils/ReactQueryProvider";
import { socket } from "@/utils/socket";
import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    initialData: Message[];
    userId: string;
};

const useMessages = ({ initialData, userId }: Props) => {
    const queryCl = useQueryClient(queryClient);
    const { conversation_id } = useParams();
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["messages", conversation_id],
    //     initialData: { messages: initialData },
    //     queryFn: async (): Promise<getMessagesReturn> => {
    //         const res = await axios.post("/api/private/messages", {
    //             conversation_id: conversation_id,
    //             userId: userId,
    //         });
    //         console.log("api called");
    //         return res.data;
    //     },
    // });
    const {
        data,
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery<Message[]>({
        queryKey: ["messages", conversation_id],
        initialData: { pages: [[...initialData]], pageParams: [0] },
        queryFn: async ({ pageParam }) => {
            const res = await axios.post(
                "/api/private/messages?page=" + pageParam,
                {
                    conversation_id: conversation_id,
                    userId: userId,
                }
            );
            // console.log("api called");
            return res.data.messages;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            // console.log(allPages.length);
            return allPages.length;
        },
        maxPages: 3,
    });
    // const fetchMore = async () => {
    //     try {
    //         const res = await axios.post("/api/private/messages?page=" + page, {
    //             conversation_id: conversation_id,
    //             userId: userId,
    //         });
    //         console.log(res.data);
    //         setPage((page) => page + 1);
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // };

    useEffect(() => {
        const soundRec = new Audio("/messageSound2.mp3");
        const soundSend = new Audio("/messageSound1.mp3");
        soundRec.autoplay = false;
        soundRec.volume = 0.8;
        soundSend.volume = 0.5;
        // const messageHandler = (message: Message) => {
        //     // setMessages((prev) => [message, ...prev]);
        //     if (message.sender_id !== userId) soundRec.play();

        //     queryCl.setQueryData(
        //         ["messages", message.conversation_id.toString()],
        //         (old: getMessagesReturn) => {
        //             if (!old) return old;
        //             return { messages: [message, ...old.messages] };
        //         }
        //     );
        // };
        const messageHandler = (message: Message) => {
            // setMessages((prev) => [message, ...prev]);
            if (message.sender_id !== userId) soundRec.play();
            else soundSend.play();

            queryCl.setQueryData(
                ["messages", message.conversation_id.toString()],
                (old: any) => {
                    if (!old) return old;
                    const newMessages = [message, ...old.pages[0]];
                    return {
                        pages: [newMessages, ...old.pages.slice(1)],
                        pageParams: old.pageParams,
                    };
                }
            );
        };
        // const readMessages = (userId: string) => {
        //     queryCl.setQueryData(
        //         ["messages", conversation_id],
        //         (old: getMessagesReturn) => {
        //             if (!old) return old;
        //             return {
        //                 messages: old.messages.map((message) =>
        //                     message.status === "delivered" &&
        //                     message.sender_id !== userId
        //                         ? { ...message, status: "read" }
        //                         : message
        //                 ),
        //             };
        //         }
        //     );
        // };

        socket.on("recieve_message", messageHandler);

        return () => {
            socket.off("recieve_message", messageHandler);
        };
    }, [queryCl, data, conversation_id, userId]);
    return [
        { messages: data.pages.flatMap((page) => page) },
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    ] as const;
};

export default useMessages;
