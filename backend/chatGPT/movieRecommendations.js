import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";

dotenv.config({path: "backend/.env"});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-jGz7VmTUjBEX1Em4o05hR8Oq",
    project: "proj_wyR8n08WGU6j048PDBuwvRie",
});

async function fetchMovieRecommendation(requestData) {
    if (requestData.sandbox) {
        return Array.from({ length: 10 }, (_, i) => ({
            name: `Фільм ${i + 1}`,
            genre: `Жанр ${i + 1}`,
            year: `Рік ${i + 1}`,
            reason: `Причина ${i + 1}`,
            rating: `9.9/10`
        }));
    }

    const questionsAndAnswers = requestData.result;
    let formattedString = questionsAndAnswers.map(qa => `Питання: ${qa.question}\nВідповідь: ${qa.answer}`).join('\n');
    
    const prompt = `
    Згенеруй список із 10 (не більше, менше лише в випадку коли це потрібно) найбільш відповідних фільмів у форматі JSON. Кожен фільм у списку має містити такі поля:
    - "name": "Назва",
    - "genre": "Жанр",
    - "year": "Рік",
    - "reason": "Причина рекомендації",
    - "rating": "Рейтинг"
    
    Використай інформацію нижче для створення рекомендацій, перевір щоб фільм підходив по абсолютно усім питанням (наприклад роки фільму повинні строго підходити під вказаний діапазон, жанр повинен бути точно такий як вказано тощо). Якщо фільм не підходить під умови, пропустити його
    
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
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const recommendations = completion.choices[0].message.content;

    try {
        return JSON.parse(recommendations);
    } catch (error) {
        console.error("Invalid response format:", completion.choices[0].message.content);
        throw new Error("Invalid response format.");
    }
}

export default fetchMovieRecommendation;