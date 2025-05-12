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
    const [filmsLoading, setFilmsLoading] = useState<boolean[]>([]);
    const [filmsErrors, setFilmsErrors] = useState<boolean[]>([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await request<BestFilm[]>(
                    `${API_BASE_URL}${API_ENDPOINTS.BEST_FILMS}`,
                );
                setFilms(data || []);
                setFilmsLoading(Array(data.length).fill(false));
                setFilmsErrors(Array(data.length).fill(false));
                console.log("Best films data:", data);
            } catch (err) {
                console.error("Error fetching best films:", err);
                setFilmsErrors(Array(films.length).fill(true));
                setFilmsLoading(Array(films.length).fill(false));
            }
        };

        fetchFilms();
    }, [request]);

    const filmsToRender = [...films, ...Array(7 - films.length).fill(null)];

    return (
        <div className={styles.bestFilms__container}>
            {filmsToRender.map((film, index) => {
                if (filmsLoading[index] || loading) {
                    return <BestFilmCardSkeleton key={index} />;
                }

                if (filmsErrors[index]) {
                    return <BestFilmCardError key={index} />;
                }

                if (film === null) {
                    return <BestFilmCardError key={index} />;
                }

                const { title, description, rating, poster_url } = film;
                return (
                    <BestFilmCard
                        key={index}
                        id={index}
                        title={title}
                        description={description}
                        rating={rating}
                        poster={poster_url}
                    />
                );
            })}
        </div>
    );
};
