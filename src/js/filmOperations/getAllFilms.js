const getAllFilms = async () => {
    try {
        const token = localStorage.getItem("token"); // ключ такий, як у POST

        if (!token) {
            console.error(
                "User is not authenticated: no token found in localStorage",
            );
            return;
        }

        console.log("Using token:", token);

        const response = await fetch("http://localhost:3000/films", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to fetch films. Status: ${response.status}. Message: ${errorText}`,
            );
        }

        const films = await response.json();
        console.log("Fetched films:", films);

        return films;
    } catch (error) {
        console.error("Error fetching films:", error);
    }
};

export default getAllFilms;
