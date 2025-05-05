import { BestFilmCard } from '@/entities/BestFilm/ui/BestFilmCard';
import img from "@/shared/assets/images/test_poster.jpg"
import styles from './BestFilms.module.scss';

export const BestFilms: React.FC = () => {
    // TODO: запит до API для отримання фільмів
    const films = [
        {
          id: 1,
          title: "Inception",
          description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
          rating: 8.8,
          poster: img
        },
        {
          id: 2,
          title: "Interstellar",
          description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival...",
          rating: 8.6,
          poster: img
        },
        {
          id: 3,
          title: "The Dark Knight",
          description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
          rating: 9.0,
          poster: img
        },
        {
          id: 4,
          title: "The Matrix",
          description: "A computer hacker learns from mysterious rebels about the true nature of his reality...",
          rating: 8.7,
          poster: img
        },
        {
          id: 5,
          title: "Fight Club",
          description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club...",
          rating: 8.8,
          poster: img
        },
        {
          id: 6,
          title: "Pulp Fiction",
          description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine...",
          rating: 8.9,
          poster: img
        },
        {
          id: 7,
          title: "The Shawshank Redemption",
          description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency...",
          rating: 9.3,
          poster: img
        }
    ];
      
    return (
        <section className={styles.bestFilms__section}>
            <h2>Найкращі фільми цього місяця</h2>
            <div className={styles.bestFilms__container}>
            {films.map((film, index) => {
                const { title, description, rating, poster } = film;

                return (
                    <BestFilmCard
                    key={index}
                    title={title}
                    description={description}
                    rating={rating}
                    poster={poster}
                    />
                );
            })}

            </div>
        </section>
    );
}