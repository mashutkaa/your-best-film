import styles from "./BestFilmCard.module.scss";

export const BestFilmCardSkeleton: React.FC = () => {
    return (
        <div className={styles.bestFilmCard__container}>
            <p>Skeleton</p>
        </div>
    );
};
