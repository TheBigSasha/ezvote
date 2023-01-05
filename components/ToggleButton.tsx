
interface ToggleButtonProps {
    on: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const ToggleButton: React.FC<React.PropsWithChildren<ToggleButtonProps>> = ({
    on,
    onClick,
    children
}) => {
    return (
        <button
            onClick={onClick}
            className={`${
                on ? "button-on" : ""
            }`}

        >
            {children}
        </button>
    );
};
