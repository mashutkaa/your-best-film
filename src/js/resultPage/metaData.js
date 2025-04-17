import { data } from "browserslist";

const metaData = () => {
    const savedResults = JSON.parse(localStorage.getItem("movieResults")) || [];
    console.log(savedResults);

    function formatSimpleResult(resultArray) {
        const parts = [];

        resultArray.forEach((item) => {
            if (Array.isArray(item)) {
                item.forEach((subItem) => {
                    parts.push(`<span>[ </span>${subItem}<span> ]</span>`);
                });
            } else if (item.answer) {
                parts.push(`<span>[ </span>${item.answer}<span> ]</span>`);
            }
        });

        return parts.join(" ");
    }

    const formattedString = formatSimpleResult(savedResults);

    const dataText = document.querySelector(".film-tags");
    dataText.innerHTML = formattedString;

    const toggleButton = document.querySelector(".show-data__button");

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            dataText.classList.toggle("hidden");
        });
    }
};

export default metaData;
