function loadBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketItemsContainer = document.getElementById('basket-items');

    basketItemsContainer.innerHTML = '';

    basket.forEach((item, index) => {
        const basketItem = document.createElement('li')
        basketItem.classList.add('basket-item');
        basketItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="basket-images">
        <span>${item.name}</span>
        <span class="basket-price">${item.price}kr</span>
        <button onclick="removeFromBasket(${index})">Remove</button>

        `;
        basketItemsContainer.appendChild(basketItem);
    });
}

function removeFromBasket(index) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index,1); //Removes item from spesific place (i think?)

    localStorage.setItem('basket', JSON.stringify(basket));

    loadBasket();
}

loadBasket();