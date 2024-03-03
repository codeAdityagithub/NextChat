import { Ewert } from "next/font/google";
import React, { useRef } from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
    dialogRef: React.RefObject<HTMLDialogElement>;
    blob: string | undefined;
};

const ImageViewDialog = ({ dialogRef, blob }: Props) => {
    // const dialogRef = useRef<HTMLDialogElement>(null);
    const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        // let scale = e.currentTarget.style.transform;
        // if (scale == "scale(1)") {
        //     e.currentTarget.style.transform = "scale(2)";
        // } else {
        //     e.currentTarget.style.transform = "scale(1)";
        // }
        // if (e.currentTarget.classList.contains("zoomed")) {
        //     e.currentTarget.height =
        //         e.currentTarget.height / 2;
        //     e.currentTarget.width =
        //         e.currentTarget.width / 2;
        //     e.currentTarget.classList.remove("zoomed");
        // } else {
        //     e.currentTarget.height =
        //         e.currentTarget.height * 2;
        //     e.currentTarget.width =
        //         e.currentTarget.width * 2;
        //     e.currentTarget.classList.add("zoomed");
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
                className="modal bg-transparent transition-opacity duration-200 p-8 md:p-16"
                ref={dialogRef}
            >
                <div className=" w-full h-full relative flex items-center justify-center bg-neutral overflow-y-scroll ver_scrollbar text-neutral-content p-3 rounded-md ">
                    <div
                        onClick={() => {
                            dialogRef.current?.close();
                        }}
                        className="absolute inset-0 z-20"
                    ></div>
                    <img
                        src={blob}
                        className="h-auto w-auto shadow-md z-30 transition-all"
                        // style={{ transform: "scale(1)" }}
                        alt="Large version of selected image"
                        draggable="false"
                        onDoubleClick={handleZoom}
                        onClick={handleZoom}
                    />
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
