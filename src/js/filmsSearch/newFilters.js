const newFilters = () => {
    console.log("new filters");
    document.getElementById("surveyModal").style.display = "flex";

    document
        .getElementById("closeModal")
        .addEventListener("click", function () {
            document.getElementById("surveyModal").style.display = "none";
        });

    const form = document.querySelector(".form");
    const submitButton = document.getElementById("submitNewFilters");

    // Видаляємо попередні обробники подій перед додаванням нового
    submitButton.replaceWith(submitButton.cloneNode(true));
    const newSubmitButton = document.getElementById("submitNewFilters");

    newSubmitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const responses = [];

        const location = document.getElementById("location").value;
        if (location)
            responses.push(
                `Події фільму відбуваються у такій локації: ${location}`
            );

        const plotComplexity = document.querySelector(
            'input[name="plot-complexity"]:checked'
        )?.value;
        if (plotComplexity) responses.push(`Сюжет: ${plotComplexity}`);

        const timePeriod = document.getElementById("time-slider").value;
        if (timePeriod !== undefined) {
            const timePeriodText = {
                0: "Минуле",
                1: "Теперішнє",
                2: "Майбутнє",
            };
            responses.push(
                `Фільм про часовий проміжок: ${timePeriodText[timePeriod]}`
            );
        }

        const basedOnTrueEvents = document.querySelector(
            'input[name="based-on-true-events"]:checked'
        )?.value;
        if (basedOnTrueEvents) {
            responses.push(
                `Фільм ${
                    basedOnTrueEvents === "Так"
                        ? "засновано на реальних подіях"
                        : "не засновано на реальних подіях"
                }`
            );
        }

        const preferredEnding =
            document.getElementById("preferred-ending").value;
        if (preferredEnding)
            responses.push(`Фінал має бути: ${preferredEnding}`);

        console.log(responses);
    });
};

export default newFilters;
