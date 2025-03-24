const saveFilm = async (filmObj, button) => {
    const newFilm = {
        name: filmObj.title,
        rating: filmObj.rating,
        genre: filmObj.genres,
        year: filmObj.releaseYear,
        description: filmObj.description,
        img_url: filmObj.posterUrl,
    };

    try {
        const response = await fetch("http://localhost:3000/films", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFilm),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Film created:", data);
        button.classList.add("saved");
    } catch (error) {
        console.error("Error:", error);
        alert("Помилка при збереженні фільму. Спробуйте ще раз.");
    }
};

export default saveFilm;
