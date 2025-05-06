import { useEffect } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
    active,
    setActive,
    children,
}) => {
    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [active]);

    return (
        <div
            className={`${styles.modal} ${active ? styles.active : ""}`}
            onClick={() => setActive(false)}
        >
            <div
                className={styles.modal__content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
