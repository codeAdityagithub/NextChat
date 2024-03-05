import React, { useRef } from "react";

type Props = {
    setFile: any;
};

const FileInputDialog = ({ setFile }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <div
                className="z-10 fixed inset-0 backdrop-blur-[1px]"
                onClick={() => dialogRef.current?.showModal()}
            ></div>
            <dialog
                className="modal bg-transparent transition-opacity duration-200 p-3"
                ref={dialogRef}
            >
                <div className="modal-box bg-neutral text-neutral-content p-3 rounded-md shadow-lg">
                    <h3 className="font-bold text-lg">
                        Discard Unsent Message?
                    </h3>
                    <p className="py-4">
                        If you close this dialog, the message won&apos;t be sent
                    </p>
                    <div className="modal-action">
                        <form
                            method="dialog"
                            className="flex items-center gap-4"
                        >
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="_btn-sm bg-error text-error-content"
                                onClick={() => setFile(null)}
                            >
                                Discard
                            </button>
                            <button className="_btn-sm h-auto">
                                Return to media
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default FileInputDialog;
