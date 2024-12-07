const items = [
    { id: 1, name: "Lit Energy", price: 120, count: 0 },
    { id: 2, name: "Adrenaline Rush 0.449", price: 140, count: 0 },
    { id: 3, name: "Adrenaline Rush 0.25", price: 100, count: 0 },
    { id: 4, name: "Булка с маком", price: 70, count: 0 },
    { id: 5, name: "Булка с корицей", price: 70, count: 0 },
    { id: 6, name: "Пицца", price: 220, count: 0 },
];

const BOT_TOKEN = "7745219113:AAHU5MCnY8vsie23jNsev5Uv0-DDJ3EvzOI"; // Вставьте токен вашего бота
const CHAT_ID = "702279530"; // Вставьте ваш ID чата (можно получить через @userinfobot)

function updateCart() {
    let total = 0;
    let order = "";

    items.forEach(item => {
        if (item.count > 0) {
            order += `${item.name} · ${item.count} x ${item.price}₽\n`;
            total += item.count * item.price;
        }
    });

    return { order, total };
}

async function sendOrderToBot(orderText) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: orderText,
        }),
    });

    if (response.ok) {
        alert("Ваш заказ отправлен!");
    } else {
        alert("Ошибка при отправке заказа. Попробуйте снова.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const viewOrderBtn = document.getElementById("view-order");

    // Обработка кнопок "плюс" и "минус"
    menu.addEventListener("click", (e) => {
        const button = e.target;
        const card = button.closest(".card");
        const name = card.querySelector("p").textContent;
        const item = items.find(i => i.name === name);

        if (button.classList.contains("plus")) {
            item.count++;
        } else if (button.classList.contains("minus") && item.count > 0) {
            item.count--;
        }

        card.querySelector(".count").textContent = item.count;
    });

    // Обработка кнопки "Отправить заказ"
    viewOrderBtn.addEventListener("click", async () => {
        const { order, total } = updateCart();

        if (order) {
            const orderText = `Ваш заказ:\n${order}\nИтого: ${total}₽`;
            await sendOrderToBot(orderText);
        } else {
            alert("Корзина пуста!");
        }
    });
});
