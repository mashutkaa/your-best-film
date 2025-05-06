import { BestFilms } from "@/widgets/BestFilms/BestFilms";
import { FilmSearchWidget } from "@/widgets/FilmSearchWidget/FilmSearchWidget";
import { AboutUs } from "@/widgets/AboutUs/AboutUs";

import styles from "./MainPage.module.scss";

export const MainPage: React.FC = () => {
    return (
        <section className={styles.mainPage__section}>
            <BestFilms />
            <FilmSearchWidget />
            <hr />
            <AboutUs />
        </section>
    );
};
