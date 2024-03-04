import { ReactNode } from "react";

type Props = {
    className: string;
    children: ReactNode;
    executionFn: () => void;
};

const LongPressDiv = ({ className, children, executionFn }: Props) => {
    let pressTimer: NodeJS.Timeout;

    const handleMouseDown = () => {
        pressTimer = setTimeout(() => {
            // Perform your long press action here
            executionFn();
        }, 1000); // Adjust the duration as needed
    };

    const handleMouseUp = () => {
        clearTimeout(pressTimer);
    };
    return (
        <div
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={className}
        >
            {children}
        </div>
    );
};

export default LongPressDiv;
