const saveRecommendation = () => {
    const saveRecommendationBtn = document.querySelector(
        ".save-recommendations__button"
    );

    if (!saveRecommendationBtn) {
        console.error("Кнопку не знайдено!");
        return;
    }

    saveRecommendationBtn.onclick = function () {
        if (!localStorage.getItem("token")?.trim()) {
            alert("Авторизуйтеся, щоб зберегти добірку");
        } else {
            alert("Вибачте, функціонал наразі не доступний");
        }
    };
};

export default saveRecommendation;
