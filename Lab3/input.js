// Переменные для отслеживания состояний
let draggedElement = null; // Элемент, который перетаскивается
let initialPosition = null; // Начальная позиция элемента
let isSticky = false; // "Приклеенный" ли элемент к мыши

// Добавляем обработчики событий на все элементы с классом "target"
document.querySelectorAll(".target").forEach((element) => {
  // Начало перетаскивания
  element.addEventListener("mousedown", (event) => {
    if (!isSticky) {
      draggedElement = element;
      const rect = element.getBoundingClientRect();
      initialPosition = { top: rect.top, left: rect.left };
      element.dataset.offsetX = event.clientX - rect.left;
      element.dataset.offsetY = event.clientY - rect.top;
    }
  });

  // Двойной клик для "приклеивания" элемента
  element.addEventListener("dblclick", () => {
    if (!isSticky) {
      isSticky = true;
      draggedElement = element;
      element.style.backgroundColor = "blue"; // Меняем цвет
    } else {
      isSticky = false;
      draggedElement.style.backgroundColor = "red"; // Возвращаем цвет
      draggedElement = null;
    }
  });
});

// Перемещение элемента вместе с курсором
window.addEventListener("mousemove", (event) => {
  if (draggedElement) {
    const offsetX = draggedElement.dataset.offsetX || 0;
    const offsetY = draggedElement.dataset.offsetY || 0;

    draggedElement.style.left = `${event.clientX - offsetX}px`;
    draggedElement.style.top = `${event.clientY - offsetY}px`;
  }
});

// Остановка перетаскивания при отпускании кнопки мыши
window.addEventListener("mouseup", () => {
  if (!isSticky) {
    draggedElement = null;
  }
});

// Завершение всех действий по нажатию клавиши ESC
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && draggedElement) {
    if (isSticky) {
      draggedElement.style.backgroundColor = "red"; // Возвращаем цвет
      isSticky = false;
    }
    draggedElement.style.left = `${initialPosition.left}px`;
    draggedElement.style.top = `${initialPosition.top}px`;
    draggedElement = null;
  }
});
