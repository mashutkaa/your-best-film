const saveRecommendation = () => {
    const saveRecommendationBtn = querySelector(
        ".save-reccomendations__button"
    );

    saveRecommendationBtn.onclick = function () {
        if (!localStorage.getItem("token")?.trim()) {
            alert("Авторизуйтеся, щоб зберегти добірку");
        } else {
            alert("Вибачте, функціонал наразі не доступний");
        }
    };
};

export default saveRecommendation;
