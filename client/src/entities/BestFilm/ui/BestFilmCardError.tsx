import styles from "./BestFilmCard.module.scss";

export const BestFilmCardError: React.FC = () => {
    return (
        <div className={styles.bestFilmCard__container}>
            <p className={styles.sadSmile}>: (</p>
            <p className={styles.errorMessage}>Фільм не знайдено</p>
        </div>
    );
};
