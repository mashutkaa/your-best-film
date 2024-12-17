import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({path: "chatGPT-NodeJS/.env"});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-jGz7VmTUjBEX1Em4o05hR8Oq",
    project: "proj_wyR8n08WGU6j048PDBuwvRie",
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/getMovieRecommendations", async (req, res) => {
    try {
        if (req.body.sandbox) {
            const sandboxMovies = [];
            for (let i = 1; i <= 10; i++) {
                sandboxMovies.push({
                    name: `Фільм ${i}`,
                    genre: `Жанр ${i}`,
                    year: `Рік ${i}`,
                    reason: `Причина чому цей фільм може сподобатися ${i}`,
                    rating: `Рейтинг ${i}`
                });
            }

            return res.status(200).json(sandboxMovies);
        }

        const questionsAndAnswers = req.body.result;
        let formattedString = questionsAndAnswers.map(qa => `Питання: ${qa.question}\nВідповідь: ${qa.answer}`).join('\n');
        
        const prompt = `
        Згенеруй список до 10 найбільш відповідних фільмів у JSON форматі. Кожен фільм повинен містити:
        - "name": "Назва",
        - "genre": "Жанр",
        - "year": "Рік",
        - "reason": "Причина рекомендації",
        - "rating": "Рейтинг"
        
        Використай інформацію нижче для створення рекомендацій, кожен фільм має відповідати усім питанням:
        
        ${formattedString}

        Відповідь повинна бути у форматі:
        [
            {
                "name": "Фільм 1",
                "genre": "Жанр 1",
                "year": "Рік 1",
                "reason": "Причина чому цей фільм може сподобатися 1",
                "rating": "Рейтинг 1"
            },
            {
                "name": "Фільм 2",
                "genre": "Жанр 2",
                "year": "Рік 2",
                "reason": "Причина чому цей фільм може сподобатися 2",
                "rating": "Рейтинг 2"
            },
            ...
            {
                "name": "Фільм 10",
                "genre": "Жанр 10",
                "year": "Рік 10",
                "reason": "Причина чому цей фільм може сподобатися 10",
                "rating": "Рейтинг 10"
            }
        ]

        Відповідь (Українською мовою):
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const recommendations = completion.choices[0].message.content;

        let parsedRecommendations;
        try {
            parsedRecommendations = JSON.parse(recommendations);
            if (!Array.isArray(parsedRecommendations)) {
                console.log(parsedRecommendations);
                throw new Error("Invalid response format.");
            }
        } catch (jsonError) {
            console.log(recommendations);
            return res.status(400).send("Invalid response format.");
        }

        res.status(200).json(parsedRecommendations);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});