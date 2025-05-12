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
    const { register, handleSubmit, watch } = useForm();

    const onSubmit = (data) => console.log(data);

    const selected = watch("contact");

    const handleOpen = () => setModalActive(true);

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
                                        id="email"
                                        value="email"
                                        {...register("contact")}
                                        className={styles.hidden_radio}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`${styles.radioImg_label} ${selected === "email" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img
                                            src={GoodMoodImg}
                                            alt="Чудовий настрій"
                                        />
                                        <span>Чудовий</span>
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
                                        className={`${styles.radioImg_label} ${selected === "phone" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img src={BoredMoodImg} alt="Нудно" />
                                        <span>Нудно</span>
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
                                        className={`${styles.radioImg_label} ${selected === "mail" ? styles.active_imgBtn : ""}`}
                                    >
                                        <img
                                            src={SadMoodImg}
                                            alt="Сумний настрій"
                                        />
                                        <span>Сумний</span>
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
                                        className={`${styles.radioImg_label} ${selected === "mail" ? styles.active_imgBtn : ""}`}
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
                                    <div className={styles.sliders_control}>
                                        <div
                                            id="fromSliderTooltip"
                                            className={styles.slider_tooltip}
                                        >
                                            0
                                        </div>
                                        <input
                                            type="range"
                                            value="0"
                                            min="0"
                                            max="8"
                                            step="1"
                                            id="fromSlider"
                                            className={styles.range_slider}
                                            {...register("duration")}
                                        />
                                        <div
                                            id="toSliderTooltip"
                                            className={styles.slider_tooltip}
                                        >
                                            8
                                        </div>
                                        <input
                                            type="range"
                                            value="8"
                                            min="0"
                                            max="8"
                                            step="1"
                                            id="toSlider"
                                            className={styles.range_slider}
                                            {...register("duration")}
                                        />
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
