import { useEffect, useState } from "react";

import { useHttp } from "@/shared/lib/hooks/http.hook";

import { BestFilmCard } from "@/entities/BestFilm/ui/BestFilmCard";
import { BestFilmCardSkeleton } from "@/entities/BestFilm/ui/BestFilmCardSkeleton";
import { BestFilmCardError } from "@/entities/BestFilm/ui/BestFilmCardError";

import { API_BASE_URL, API_ENDPOINTS } from "@/shared/consts/api";

import { BestFilm } from "@/shared/types/BestFilm";

import styles from "./BestFilms.module.scss";

export const BestFilms: React.FC = () => {
    const { loading, request } = useHttp();
    const [films, setFilms] = useState<BestFilm[]>([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await request<BestFilm[]>(
                    `${API_BASE_URL}${API_ENDPOINTS.BEST_FILMS}`,
                );
                setFilms(data || []);
            } catch (err) {
                console.error("Error fetching best films:", err);
            }
        };

        fetchFilms();
    }, [request]);

    const filmsToRender = [...films, ...Array(7 - films.length).fill(null)];

    return (
        <div className={styles.bestFilms__container}>
            {filmsToRender.map((film, index) => {
                if (film === null) {
                    return <BestFilmCardError key={index} />;
                }

                if (loading) {
                    return <BestFilmCardSkeleton key={index} />;
                }

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
    );
};
