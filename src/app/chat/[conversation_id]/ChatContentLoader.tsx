import React from "react";

const ChatContentLoader = () => {
    return (
        <>
            {[8, 1, 2, 3, 4, 5, 6, 7, 9].map((i) =>
                i % 2 === 0 ? (
                    <div className="chat chat-end" key={i}>
                        <div className="chat-header"></div>
                        <div className="chat-bubble animate-pulse bg-primary relative rounded-md w-40 h-10"></div>
                        <div className="chat-footer animate-pulse mt-1 rounded-md bg-primary w-10 h-3"></div>
                    </div>
                ) : (
                    <div className="chat chat-start " key={i}>
                        <div className="chat-image avatar">
                            <div
                                className={`w-10 h-10 rounded-full overflow-hidden relative bg-secondary animate-pulse`}
                            ></div>
                        </div>
                        <div className="chat-header"></div>
                        <div className="chat-bubble animate-pulse bg-secondary relative rounded-md w-40 h-10"></div>
                        <div className="chat-footer animate-pulse mt-1 rounded-md bg-secondary w-10 h-3"></div>
                    </div>
                )
            )}
        </>
    );
};

export default ChatContentLoader;
