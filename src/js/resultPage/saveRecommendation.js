import metaData from "./metaData";

const saveRecommendation = () => {
    const saveRecommendationBtn = document.querySelector(
        ".save-recommendations__button",
    );

    if (!saveRecommendationBtn) {
        console.error("Кнопку не знайдено!");
        return;
    }

    saveRecommendationBtn.onclick = async function () {
        const token = localStorage.getItem("token");
        console.log("Отримано токен:", token);

        if (!token?.trim()) {
            alert("Авторизуйтеся, щоб зберегти добірку");
            return;
        }

        const recommendations = JSON.parse(
            localStorage.getItem("checkedRecommendations"),
        );
        console.log("Отримані рекомендації:");
        console.log(recommendations);

        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            alert("Немає добірки для збереження");
            return;
        }

        const name = prompt("Введіть назву для вашої добірки:");
        console.log("Введена назва:", name);

        if (!name?.trim()) {
            alert("Назва добірки обовʼязкова");
            return;
        }

        try {
            // --- 1. Створення колекції ---
            console.log("Надсилаємо запит на створення колекції...");

            const meta_data = metaData(); // отримуємо метадані

            const collectionRes = await fetch(
                "http://localhost:3000/collections",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, meta_data }), // відправляємо name як назву добірки
                },
            );

            console.log(
                "Отримана відповідь на створення колекції:",
                collectionRes,
            );

            const contentType = collectionRes.headers.get("Content-Type");
            let collectionData;

            if (contentType && contentType.includes("application/json")) {
                collectionData = await collectionRes.json();
                console.log("Дані з відповіді:", collectionData);
            } else {
                throw new Error("Невірний формат відповіді від сервера");
            }

            if (!collectionRes.ok) {
                throw new Error(
                    collectionData?.message || "Помилка створення колекції",
                );
            }

            const collectionId = collectionData.id; // отримуємо ID нової колекції
            console.log("Створено колекцію з ID:", collectionId);

            this.textContent = "Добірку збережено";
            this.disabled = true;

            // --- 2. Додавання фільмів до колекції ---
            for (let i = 0; i < recommendations.length; i++) {
                const film = recommendations[i];
                const saveButton = document.getElementById(
                    `${i}-save-film__button`,
                );
                const isSaved =
                    saveButton?.classList.contains("saved") || false;

                console.log(
                    `Додаємо фільм ${i + 1}/${recommendations.length}`,
                    {
                        film,
                        isSaved,
                    },
                );

                console.log(film);
                const filmRes = await fetch(
                    "http://localhost:3000/collections/collection-films",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            collection_id: collectionId,
                            name: film.title,
                            rating: film.rating,
                            genre: film.genres,
                            year: film.releaseYear,
                            description: film.description,
                            img_url: film.posterUrl,
                            is_saved: isSaved,
                        }),
                    },
                );

                if (!filmRes.ok) {
                    console.error(
                        "Помилка при додаванні фільму:",
                        await filmRes.text(),
                    );
                    throw new Error("Не вдалося додати фільм до колекції");
                }
            }

            alert("Добірку збережено успішно!");
        } catch (err) {
            console.error("Помилка при збереженні добірки:", err);
            alert("Не вдалося зберегти добірку");

            this.textContent = "Зберегти добірку";
            this.disabled = false;
        }
    };
};

export default saveRecommendation;
