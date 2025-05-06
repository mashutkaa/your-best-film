import { BestFilm } from "@/shared/types/BestFilm";

import styles from "./BestFilmCard.module.scss";

type BestFilmCardProps = BestFilm & { key: number };

export const BestFilmCard: React.FC<BestFilmCardProps> = ({
    key,
    title,
    description,
    rating,
    poster,
}) => {
    const infoClass =
        key <= 2
            ? `${styles.bestFilmCard__info} ${styles.right}`
            : `${styles.bestFilmCard__info} ${styles.left}`;

    return (
        <div className={styles.bestFilmCard__container}>
            <img
                className={styles.poster__img}
                src={poster}
                alt={`"${title}" постер`}
            />
            <div className={infoClass}>
                <div className={styles.info__wrapper}>
                    <h3 className={styles.title__text}>{title}</h3>
                    <p className={styles.description__text}>{description}</p>
                    <p className={styles.rating__text}>{rating}/10</p>
                </div>
            </div>
        </div>
    );
};
