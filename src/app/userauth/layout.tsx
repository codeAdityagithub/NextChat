import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const layout = ({ children }: Props) => {
    return (
        <div className="w-full h-full p-4 overflow-y-auto flex flex-col relative font-sans justify-center items-center box-border">
            {children}
        </div>
    );
};

export default layout;
