import { useState, ReactElement, cloneElement } from "react";

import { Modal } from "@/shared/ui/Modal/Modal";

import styles from "./FindFilms.module.scss";

interface FindFilmsProps {
    children: ReactElement<{ onClick?: () => void }>;
}

export const FindFilms: React.FC<FindFilmsProps> = ({ children }) => {
    const [modalActive, setModalActive] = useState(false);

    const handleOpen = () => setModalActive(true);

    const trigger = cloneElement(children, {
        onClick: handleOpen,
    });

    return (
        <div className={styles.filmSearch__container}>
            {trigger}
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Form</p>
            </Modal>
        </div>
    );
};
