document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token?.trim()) {
        console.log("Користувач не авторизований.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/collections", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const collections = await response.json();
        console.log("Отримані добірки:", collections);

        renderCollections(collections);
    } catch (err) {
        console.error("Помилка при отриманні добірок:", err);
    }
});

function renderCollections(collections) {
    const section = document.querySelector(".saved-collections__section");
    section.innerHTML = ""; // очищаємо контейнер перед рендером

    collections.forEach((collection) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("collection__wrapper");

        // Назва добірки
        const title = document.createElement("h3");
        title.textContent = `${collection.collection_name}`;

        // Метадані
        const meta = document.createElement("p");
        meta.classList.add("meta-data");
        meta.innerHTML = formatMetaData(collection.meta_data); // адаптуй ключ, якщо інший

        // Кнопки
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        // Переглянути добірку
        const viewBtn = document.createElement("button");
        viewBtn.classList.add("show-collection__btn");
        viewBtn.textContent = "Переглянути добірку";
        viewBtn.addEventListener("click", () => {
            window.location.href = `/collection.html?id=${collection.id}`;
        });

        // Видалити добірку
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-collection__btn");
        deleteBtn.innerHTML = `<img src="./icons/delete-button.svg" alt="delete collection">`;
        deleteBtn.addEventListener("click", async () => {
            const confirmDelete = confirm(
                "Ви впевнені, що хочете видалити добірку?",
            );
            if (!confirmDelete) return;

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:3000/collections/${collection.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(error);
                }

                // Повторний запит після видалення
                const newResponse = await fetch(
                    "http://localhost:3000/collections",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const updatedCollections = await newResponse.json();
                renderCollections(updatedCollections);
            } catch (err) {
                console.error("Помилка при видаленні добірки:", err.message);
            }
        });

        // Збірка елементів
        buttons.appendChild(viewBtn);
        buttons.appendChild(deleteBtn);

        wrapper.appendChild(title);
        wrapper.appendChild(meta);
        wrapper.appendChild(buttons);

        section.appendChild(wrapper);

        const showButton = wrapper.querySelector(".show-collection__btn");
        showButton.addEventListener("click", () => {
            window.location.href = `collection.html?id=${collection.id}`;
        });
    });
}

// Допоміжна функція для форматування метаданих
function formatMetaData(metaString) {
    if (typeof metaString !== "string") return "";

    const matches = metaString.match(/\[(.*?)\]/g);
    if (!matches) return "";

    return matches
        .map((item) => {
            const content = item.slice(1, -1);
            return `<span>[ </span>${content}<span> ]</span>`;
        })
        .join(" ");
}
