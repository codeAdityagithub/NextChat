import { Ewert } from "next/font/google";
import React, { useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
    dialogRef: React.RefObject<HTMLDialogElement>;
    blob: string | undefined;
};

const ImageViewDialog = ({ dialogRef, blob }: Props) => {
    // const dialogRef = useRef<HTMLDialogElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        // if (isZoomed) {
        // e.currentTarget.style.width = `${e.currentTarget.clientWidth * 2}px`;
        setIsZoomed((prev) => !prev);
        // } else {
        //     e.currentTarget.style.width = `${e.currentTarget.width / 2}px`;
        //     setIsZoomed((prev) => !prev);
        // }
    };
    return (
        <>
            {/* {dialogRef.current?.open && (
                <div
                    className="z-10 fixed inset-0 backdrop-blur-[1px]"
                    onClick={() => dialogRef.current?.close()}
                ></div>
            )} */}
            <dialog
                id="my_modal_1"
                className="modal bg-transparent z-20 transition-opacity duration-200 p-8 md:p-16"
                ref={dialogRef}
            >
                <div
                    onClick={() => {
                        dialogRef.current?.close();
                    }}
                    className="absolute inset-0 z-30"
                ></div>
                <div className="max-h-full max-w-full z-40 overflow-auto ver_scrollbar relative bg-neutral text-neutral-content p-3 rounded-md flex items-start justify-start">
                    <div className="w-auto h-auto">
                        <img
                            src={blob}
                            className={`select-none shadow-md transition-all w-full h-auto ${
                                isZoomed
                                    ? "scale-[2] translate-x-[50%] translate-y-[50%] cursor-zoom-out"
                                    : "cursor-zoom-in"
                            }`}
                            alt="Large version of selected image"
                            draggable="false"
                            onClick={handleZoom}
                        />
                    </div>
                </div>
                <div className="modal-action absolute top-4 right-4 z-30">
                    <form method="dialog" className="flex items-center gap-4">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-red-500 bg-neutral text-2xl shadow-lg">
                            <FaWindowClose />
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default ImageViewDialog;
