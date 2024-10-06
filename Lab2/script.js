function generateShirtCards() {
    const container = document.getElementById('shirts-container'); // Контейнер для карточек
    shirts.forEach(shirt => {
        // Создаем элемент карточки
        const card = document.createElement('div');
        card.classList.add('shirt-card');

        // Название футболки
        const title = document.createElement('h3');
        title.textContent = shirt.name || 'Unnamed Shirt';

        // Описание футболки
        const description = document.createElement('p');
        description.textContent = shirt.description || 'No description available';

        // Цена футболки
        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `Price: ${shirt.price || 'Unavailable'}`;

        // Изображение футболки (показываем изображение первой доступной версии)
        const image = document.createElement('img');
        const firstColor = Object.keys(shirt.colors)[0];
        if (shirt.colors && shirt.colors[firstColor]) {
            image.src = shirt.colors[firstColor].front;
            image.alt = `${shirt.name} - Front`;
        } else {
            image.src = shirt.default.front; // Изображение по умолчанию
            image.alt = 'Default image';
        }

        // Доступные цвета
        const colorsInfo = document.createElement('p');
        const colorCount = Object.keys(shirt.colors).length;
        colorsInfo.textContent = `Available in ${colorCount} ${colorCount === 1 ? 'color' : 'colors'}`;

        // Кнопки "Quick View" и "See Page"
        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.classList.add('quick-view-btn');

        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        seePageButton.classList.add('see-page-btn');

        seePageButton.addEventListener('click', (event) => {
            const shirtName = event.target.closest('.shirt-card').querySelector('h3').textContent;
            localStorage.setItem('selectedShirt', shirtName);  // Сохраняем выбранную футболку
            window.location.href = 'details.html';  // Переходим на страницу деталей
        });

        // Добавляем все элементы в карточку
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(colorsInfo);
        card.appendChild(quickViewButton);
        card.appendChild(seePageButton);

        container.appendChild(card);
    });


    
}

// Вызов функции при загрузке страницы
window.onload = generateShirtCards;

