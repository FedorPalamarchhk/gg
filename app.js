const items = [
    { id: 1, name: "Lit Energy", price: 120, count: 0 },
    { id: 2, name: "Adrenaline Rush 0.449", price: 140, count: 0 },
    { id: 3, name: "Adrenaline Rush 0.25", price: 100, count: 0 },
    { id: 4, name: "Булка с маком", price: 70, count: 0 },
    { id: 5, name: "Булка с корицей", price: 70, count: 0 },
    { id: 6, name: "Пицца", price: 220, count: 0 },
];

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

    // Обработка кнопки "Показать заказ"
    viewOrderBtn.addEventListener("click", () => {
        const { order, total } = updateCart();

        if (order) {
            alert(`Ваш заказ:\n${order}\nИтого: ${total}₽`);
        } else {
            alert("Корзина пуста!");
        }
    });
});







