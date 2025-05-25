import { FindFilms } from "@/features/findFilms/ui/FindFilms";

import ArrowIcon from "@/shared/assets/icons/arrow.svg";

import styles from "./FilmSearchWidget.module.scss";

export const FilmSearchWidget: React.FC = () => {
    return (
        <>
            <div className={styles.filmSearch__container}>
                <h1>Що подивитися сьогодні?</h1>
                <img src={ArrowIcon} alt="arrow icon" />
                <FindFilms>
                    <button className={styles.filmSearch__button}>
                        Знайти фільм
                    </button>
                </FindFilms>
            </div>
            <hr />
        </>
    );
};
