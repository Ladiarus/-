// Получаем данные из localStorage
const selectedShirtName = localStorage.getItem('selectedShirt');

// Находим выбранную футболку в массиве shirts
const selectedShirt = shirts.find(shirt => shirt.name === selectedShirtName);


const shirtNameEl = document.getElementById('shirt-name');
const shirtImageEl = document.getElementById('shirt-image');
const shirtPriceEl = document.getElementById('shirt-price');
const shirtDescriptionEl = document.getElementById('shirt-description');
const colorButtonsEl = document.getElementById('color-buttons');

// Установка начальных значений
shirtNameEl.textContent = selectedShirt.name;
shirtImageEl.src = selectedShirt.default.front;  
shirtPriceEl.textContent = selectedShirt.price;
shirtDescriptionEl.textContent = selectedShirt.description;

// Генерация кнопок для смены цвета
Object.keys(selectedShirt.colors).forEach(color => {
    const colorBtn = document.createElement('button');
    colorBtn.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    colorBtn.classList.add('color-btn');
    
    // Задаем цвет фона кнопки
    colorBtn.style.backgroundColor = color;

    // Обработчик нажатия на цвет
    colorBtn.addEventListener('click', () => {
        shirtImageEl.src = selectedShirt.colors[color].front;  // По умолчанию отображаем front
        const activeBttn = document.querySelector('.color-btn-active')?.classList.remove('color-btn-active');
        colorBtn.classList.add('color-btn-active');
    });

    colorButtonsEl.appendChild(colorBtn);
});

// Обработка переключения между front и back
document.getElementById('front-btn').addEventListener('click', () => {
    const currentColor = document.querySelector('.color-btn-active')?.textContent.toLowerCase() || 'white';
    shirtImageEl.src = selectedShirt.colors[currentColor].front;
});

document.getElementById('back-btn').addEventListener('click', () => {
    const currentColor = document.querySelector('.color-btn-active')?.textContent.toLowerCase() || 'white';
    shirtImageEl.src = selectedShirt.colors[currentColor].back;
});
