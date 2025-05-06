import { BestFilms as BestFilmsList} from '@/features/getBestFilms/ui/BestFilms';

import styles from './BestFilms.module.scss';

export const BestFilms: React.FC = () => {
      
    return (
        <section className={styles.bestFilms__section}>
            <h2>Найкращі фільми цього місяця</h2>
            <BestFilmsList/>
        </section>
    );
}