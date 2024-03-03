import { Ewert } from "next/font/google";
import React, { useRef } from "react";
import { FaWindowClose } from "react-icons/fa";

type Props = {
    dialogRef: React.RefObject<HTMLDialogElement>;
    blob: string;
};

const ImageViewDialog = ({ dialogRef, blob }: Props) => {
    // const dialogRef = useRef<HTMLDialogElement>(null);

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
                className="modal bg-transparent transition-opacity duration-200 p-3 md:p-6 lg:p-16"
                ref={dialogRef}
            >
                <div className="modal-box w-full h-full relative flex items-center justify-center bg-neutral/30 overflow-auto ver_scrollbar text-neutral-content p-3 rounded-md ">
                    <div
                        onClick={() => {
                            dialogRef.current?.close();
                        }}
                        className="absolute inset-0 z-20"
                    ></div>
                    <img
                        src={blob}
                        className="max-h-[500px] shadow-md z-30"
                        style={{ scale: 1 }}
                        alt="Large version of selected image"
                        draggable="false"
                        onWheel={(e) => {
                            let scale = Number(e.currentTarget.style.scale);
                            if (e.deltaY > 0) {
                                scale = Math.min(scale + 0.1, 2);
                                e.currentTarget.style.scale = scale.toString();
                            } else {
                                scale = Math.max(scale - 0.1, 1);

                                e.currentTarget.style.scale = scale.toString();
                            }
                        }}
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
