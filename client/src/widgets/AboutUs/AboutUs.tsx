import LaptopImg from "@/shared/assets/images/Laptop.png";
import LogoTMDB from "@/shared/assets/images/Logo_TMDB.svg";

import styles from "./AboutUs.module.scss";

export const AboutUs: React.FC = () => {
    return (
        <section className={styles.aboutUs__section}>
            <div className={styles.aboutUs__content}>
                <img
                    className={styles.aboutUs__image}
                    src={LaptopImg}
                    alt="Laptop img"
                />
                <div className={styles.aboutUs__textBlock}>
                    <h2>Про нас</h2>
                    <div className={styles.aboutUs__description}>
                        <h3 className={styles.aboutUs__subtitle}>
                            Не знаєте, що подивитися?
                        </h3>
                        <br />
                        <p className={styles.aboutUs__paragraph}>
                            Ми допоможемо вирішити цю проблему! Адже заповнивши
                            форму, ви отримаєте персоналізовану добірку фільмів.
                            І це абсолютно безкоштовно. Впевнені, що для
                            посиденьок в компанії друзів, вечору з родиною або з
                            другою половинкою, ми обов’язково знайдемо для вас
                            вдалий фільм, що влучить у саме серденько.
                        </p>
                    </div>
                    <button className={styles.filmSearch__button}>
                        Отримати добірку рекомендацій
                    </button>
                </div>
            </div>
            <div className={styles.aboutUs__tmdb}>
                <img
                    className={styles.aboutUs__tmdbLogo}
                    src={LogoTMDB}
                    alt="Logo TMDB"
                />
                <p className={styles.aboutUs__tmdbText}>
                    This product uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </p>
            </div>
            <hr />
        </section>
    );
};
