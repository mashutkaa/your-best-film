import fetchMovieRecommendation from "../chatGPT/movieRecommendations.js";

export async function getMovieRecommendations(req, res) {
    try {
        const recommendations = await fetchMovieRecommendation(req.body);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}
