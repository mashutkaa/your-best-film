import checkResults from "./checkResults";
import saveRecommendation from "./saveRecommendation";
import metaData from "./metaData.js";

document.addEventListener("DOMContentLoaded", (event) => {
    checkResults();
    saveRecommendation();
    metaData();
});
