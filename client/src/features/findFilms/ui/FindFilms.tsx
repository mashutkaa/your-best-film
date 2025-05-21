import { useState, useEffect, ReactElement, cloneElement } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/shared/ui/Modal/Modal";

import GoodMoodImg from "@/shared/assets/images/Mood_good.png";
import BoredMoodImg from "@/shared/assets/images/Mood_bored.png";
import SadMoodImg from "@/shared/assets/images/Mood_sad.png";
import TiredMoodImg from "@/shared/assets/images/Mood_tired.png";

import styles from "./FindFilms.module.scss";

interface FindFilmsProps {
    children: ReactElement<{ onClick?: () => void }>;
}

export const FindFilms: React.FC<FindFilmsProps> = ({ children }) => {
    const [modalActive, setModalActive] = useState(false);
    const [minDuration, setMinDuration] = useState(0);
    const [maxDuration, setMaxDuration] = useState(8);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            mood: "Чудовий",
            minDuration: 0,
            maxDuration: 8,
            company: "Наодинці",
            yearFrom: "",
            yearTo: "",
            genres: [],
        },
    });

    const onSubmit = (data: unknown) => console.log(data);

    const [
        selectedMood,
        selectedCompany,
        selectedYearFrom,
        selectedYearTo,
        selectedGenres,
    ] = watch(["mood", "company", "yearFrom", "yearTo", "genres"]);

    // Додаємо синхронізацію значень повзунків з формою
    useEffect(() => {
        setValue("minDuration", minDuration);
    }, [minDuration, setValue]);
    useEffect(() => {
        setValue("maxDuration", maxDuration);
    }, [maxDuration, setValue]);

    const handleOpen = () => setModalActive(true);

    // модалка
    const trigger = cloneElement(children, {
        onClick: handleOpen,
    });

    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.findFilms__container}>
            {trigger}
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={styles.formName}>
                    <h2 className={styles.formName__header}>Пошук фільму</h2>
                    <p className={styles.formName__description}>
                        Вказані вами вподобання допоможуть швидше знайти цікаві
                        фільми для перегляду
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.findFilms__form}
                >
                    <ol>
                        <li>
                            <span className={styles.num}>1</span>
                            <div className={styles.question__wrapper}>
                                <p className={styles.isRequired}>
                                    *поле обов’язкове
                                </p>
                                <h4 className={styles.questionName}>
                                    Який настрій у вас сьогодні?
                                </h4>
                                <div className={styles.radioImg_button_group}>
                                    <input
                                        type="radio"
                                        id="good"
                                        value="Чудовий"
                                        {...register("mood")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="good"
                                        className={`${styles.radioImg_label} ${selectedMood === "Чудовий" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img
                                            src={GoodMoodImg}
                                            alt="Чудовий настрій"
                                        />
                                        <span>Чудовий</span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="bored"
                                        value="Нудно"
                                        {...register("mood")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="bored"
                                        className={`${styles.radioImg_label} ${selectedMood === "Нудно" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img src={BoredMoodImg} alt="Нудно" />
                                        <span>Нудно</span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="sad"
                                        value="Сумний"
                                        {...register("mood")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="sad"
                                        className={`${styles.radioImg_label} ${selectedMood === "Сумний" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img
                                            src={SadMoodImg}
                                            alt="Сумний настрій"
                                        />
                                        <span>Сумний</span>
                                    </label>

                                    <input
                                        type="radio"
                                        id="tired"
                                        value="Втомлений"
                                        {...register("mood")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="tired"
                                        className={`${styles.radioImg_label} ${selectedMood === "Втомлений" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img
                                            src={TiredMoodImg}
                                            alt="Втомлений настрій"
                                        />
                                        <span>Втомлений</span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li>
                            <span className={styles.num}>2</span>
                            <div className={styles.question__wrapper}>
                                <p className={styles.isRequired}>
                                    *поле обов’язкове
                                </p>
                                <h4 className={styles.questionName}>
                                    Яка тривалість фільму?
                                </h4>
                                <div className={styles.range_question}>
                                    <input
                                        type="range"
                                        min={0}
                                        max={8}
                                        step={1}
                                        value={minDuration}
                                        onChange={(e) =>
                                            setMinDuration(
                                                Math.min(
                                                    Number(e.target.value),
                                                    maxDuration - 1,
                                                ),
                                            )
                                        }
                                        className={`${styles.rangeSlider} ${styles.lower}`}
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={8}
                                        step={1}
                                        value={maxDuration}
                                        onChange={(e) =>
                                            setMaxDuration(
                                                Math.max(
                                                    Number(e.target.value),
                                                    minDuration + 1,
                                                ),
                                            )
                                        }
                                        className={`${styles.rangeSlider} ${styles.upper}`}
                                    />
                                    {/* Додаємо приховані інпути для реєстрації у формі */}
                                    <input
                                        type="hidden"
                                        {...register("minDuration", {
                                            required: true,
                                        })}
                                        value={minDuration}
                                    />
                                    <input
                                        type="hidden"
                                        {...register("maxDuration", {
                                            required: true,
                                        })}
                                        value={maxDuration}
                                    />
                                    <div className={styles.sliderLabels}>
                                        {[
                                            "0 хв",
                                            "2 год",
                                            "4 год",
                                            "6 год",
                                            "8 год",
                                        ].map((label, index) => (
                                            <span key={index}>{label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <span className={styles.num}>3</span>
                            <div className={styles.question__wrapper}>
                                <p className={styles.isRequired}>
                                    *поле обов’язкове
                                </p>
                                <h4 className={styles.questionName}>
                                    З ким переглядатимите фільм?
                                </h4>
                                <div className={styles.radio_button_group}>
                                    <input
                                        type="radio"
                                        id="company_alone"
                                        value="Наодинці"
                                        {...register("company")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="company_alone"
                                        className={`${styles.radio_label} ${selectedCompany === "Наодинці" ? styles.active_btn : ""}`}
                                    >
                                        Наодинці
                                    </label>

                                    <input
                                        type="radio"
                                        id="company_friends"
                                        value="З друзями"
                                        {...register("company")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="company_friends"
                                        className={`${styles.radio_label} ${selectedCompany === "З друзями" ? styles.active_btn : ""}`}
                                    >
                                        З друзями
                                    </label>

                                    <input
                                        type="radio"
                                        id="company_partner"
                                        value="З другою половинкою"
                                        {...register("company")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="company_partner"
                                        className={`${styles.radio_label} ${selectedCompany === "З другою половинкою" ? styles.active_btn : ""}`}
                                    >
                                        З другою половинкою
                                    </label>

                                    <input
                                        type="radio"
                                        id="company_family"
                                        value="З родиною ( разом з дітьми )"
                                        {...register("company")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="company_family"
                                        className={`${styles.radio_label} ${selectedCompany === "З родиною ( разом з дітьми )" ? styles.active_btn : ""}`}
                                    >
                                        З родиною ( разом з дітьми )
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li>
                            <span className={styles.num}>4</span>
                            <div className={styles.question__wrapper}>
                                <p className={styles.isRequired}></p>
                                <h4 className={styles.questionName}>
                                    Роки виходу фільму:
                                </h4>
                                <div className={styles.years_input_group}>
                                    <div>
                                        <label htmlFor="yearFrom">
                                            Не раніше
                                        </label>
                                        <input
                                            // type="number"
                                            id="yearFrom"
                                            placeholder="1950"
                                            min={1950}
                                            max={currentYear}
                                            {...register("yearFrom", {
                                                min: {
                                                    value: 1950,
                                                    message:
                                                        "Рік не менше 1950",
                                                },
                                                max: {
                                                    value: currentYear,
                                                    message: `Рік не більше ${currentYear}`,
                                                },
                                                validate: {
                                                    fourDigits: (v) =>
                                                        !v ||
                                                        /^\d{4}$/.test(v) ||
                                                        "Рік введено некоретно",
                                                    lessThanTo: (v) =>
                                                        !v ||
                                                        !watch("yearTo") ||
                                                        Number(v) <
                                                            Number(
                                                                watch("yearTo"),
                                                            ) ||
                                                        "Перший рік має бути менше другого",
                                                },
                                            })}
                                            className={styles.years_input}
                                        />
                                        {errors.yearFrom && (
                                            <span className={styles.error}>
                                                {errors.yearFrom.message}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="yearTo">
                                            Не пізніше
                                        </label>
                                        <input
                                            // type="number"
                                            id="yearTo"
                                            placeholder={String(currentYear)}
                                            min={1950}
                                            max={currentYear}
                                            {...register("yearTo", {
                                                min: {
                                                    value: 1950,
                                                    message:
                                                        "Рік не менше 1950",
                                                },
                                                max: {
                                                    value: currentYear,
                                                    message: `Рік не більше ${currentYear}`,
                                                },
                                                validate: {
                                                    fourDigits: (v) =>
                                                        !v ||
                                                        /^\d{4}$/.test(v) ||
                                                        "Рік введено некоретно",
                                                    moreThanFrom: (v) =>
                                                        !v ||
                                                        !watch("yearFrom") ||
                                                        Number(v) >
                                                            Number(
                                                                watch(
                                                                    "yearFrom",
                                                                ),
                                                            ) ||
                                                        "Другий рік має бути більше першого",
                                                },
                                            })}
                                            className={styles.years_input}
                                        />
                                        {errors.yearTo && (
                                            <span className={styles.error}>
                                                {errors.yearTo.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <span className={styles.num}>5</span>
                            <div className={styles.question__wrapper}>
                                <p className={styles.isRequired}></p>
                                <h4 className={styles.questionName}>
                                    У яких жанрах шукатимемо фільм?
                                </h4>
                                <div className={styles.radio_button_group}>
                                    {[
                                        "Драма",
                                        "Комедія",
                                        "Бойовик",
                                        "Трилер",
                                        "Жахи",
                                        "Фантастика",
                                        "Фентезі",
                                        "Пригоди",
                                        "Мелодрама",
                                        "Документальний фільм",
                                        "Вестерн",
                                        "Історичний фільм",
                                        "Кримінал",
                                        "Мюзикл",
                                        "Анімаційний фільм",
                                        "Спортивний фільм",
                                        "Сімейний фільм",
                                        "Комедійний бойовик",
                                        "Науково-фантастичний трилер",
                                        "Романтична фантастика",
                                        "Пригодницьке фентезі",
                                    ].map((genre) => (
                                        <label
                                            key={genre}
                                            className={`${styles.radio_label} ${
                                                watch("genres")?.includes(genre)
                                                    ? styles.active_btn
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                value={genre}
                                                {...register("genres")}
                                                className={styles.hidden_radio}
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ol>

                    <button type="submit">Знайти фільми</button>
                </form>
            </Modal>
        </div>
    );
};
