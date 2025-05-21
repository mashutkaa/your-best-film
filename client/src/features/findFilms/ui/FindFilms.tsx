import { useState, ReactElement, cloneElement } from "react";
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

    const { register, handleSubmit, watch } = useForm();

    const onSubmit = (data) => console.log(data);

    const selected = watch("mood");

    const handleOpen = () => setModalActive(true);

    // модалка
    const trigger = cloneElement(children, {
        onClick: handleOpen,
    });

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
                                        className={`${styles.radioImg_label} ${selected === "Чудовий" ? styles.active_imgBtn : ""}`}
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
                                        className={`${styles.radioImg_label} ${selected === "Нудно" ? styles.active_imgBtn : ""}`}
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
                                        className={`${styles.radioImg_label} ${selected === "Сумний" ? styles.active_imgBtn : ""}`}
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
                                        className={`${styles.radioImg_label} ${selected === "Втомлений" ? styles.active_imgBtn : ""}`}
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
                                        id="email"
                                        value="email"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`${styles.radio_label} ${selected === "email" ? styles.active_btn : ""}`}
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="radio"
                                        id="phone"
                                        value="phone"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="phone"
                                        className={`${styles.radio_label} ${selected === "phone" ? styles.active_btn : ""}`}
                                    >
                                        Phone
                                    </label>

                                    <input
                                        type="radio"
                                        id="mail"
                                        value="mail"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="mail"
                                        className={`${styles.radio_label} ${selected === "mail" ? styles.active_btn : ""}`}
                                    >
                                        Mail
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
                                <div className={styles.radio_button_group}>
                                    <input
                                        type="radio"
                                        id="email"
                                        value="email"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`${styles.radio_label} ${selected === "email" ? styles.active_btn : ""}`}
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="radio"
                                        id="phone"
                                        value="phone"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="phone"
                                        className={`${styles.radio_label} ${selected === "phone" ? styles.active_btn : ""}`}
                                    >
                                        Phone
                                    </label>

                                    <input
                                        type="radio"
                                        id="mail"
                                        value="mail"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="mail"
                                        className={`${styles.radio_label} ${selected === "mail" ? styles.active_btn : ""}`}
                                    >
                                        Mail
                                    </label>
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
                                    <input
                                        type="radio"
                                        id="email"
                                        value="email"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`${styles.radio_label} ${selected === "email" ? styles.active_btn : ""}`}
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="radio"
                                        id="phone"
                                        value="phone"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="phone"
                                        className={`${styles.radio_label} ${selected === "phone" ? styles.active_btn : ""}`}
                                    >
                                        Phone
                                    </label>

                                    <input
                                        type="radio"
                                        id="mail"
                                        value="mail"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="mail"
                                        className={`${styles.radio_label} ${selected === "mail" ? styles.active_btn : ""}`}
                                    >
                                        Mail
                                    </label>
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
