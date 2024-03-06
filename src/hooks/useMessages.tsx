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
