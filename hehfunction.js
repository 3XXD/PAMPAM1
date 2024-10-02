let currentPage = 1;
const pages = {
    1: document.getElementById('page-1'),
    2: document.getElementById('page-2'),
    3: document.getElementById('page-3'),
    4: document.getElementById('summary-page')
};

let arrivalResponse = ''; // Переменная для хранения ответа о приезде
let selectedDateTime = ''; // Переменная для хранения выбранной даты и времени

// Переход на следующую страницу
function goToPage(pageNumber) {
    for (let page in pages) {
        pages[page].classList.add('hidden');
    }
    pages[pageNumber].classList.remove('hidden');
}

// Добавление сердечка при наведении на кнопку
function createHeart(button) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    button.appendChild(heart);

    // Устанавливаем случайное положение сердечка внутри кнопки
    heart.style.left = Math.random() * 100 + 'px'; // Случайное положение по горизонтали
    heart.style.top = Math.random() * 100 + 'px'; // Случайное положение по вертикали

    // Удаляем сердечко через 2 секунды
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Функция для создания плавающих сердечков на фоне
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');

    // Устанавливаем случайное положение сердечка по горизонтали
    heart.style.left = Math.random() * 100 + 'vw'; // Случайное положение по ширине окна
    heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // Случайная продолжительность анимации от 3 до 6 секунд
    document.body.appendChild(heart);

    // Удаляем сердечко после завершения анимации
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Создаем плавающие сердечки каждые 1.5 секунды
setInterval(createFloatingHeart, 1500);

// Обработчик для первой страницы
document.getElementById('yes-btn').addEventListener('click', function () {
    createHeart(this); // Создаем сердечко при нажатии
    goToPage(2); // Переход на страницу выбора даты
});

// Обработчик для второй страницы
document.getElementById('submit-date-time').addEventListener('click', function () {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (date && time) {
        selectedDateTime = date + ' в ' + time; // Сохранение выбранной даты и времени
        document.getElementById('chosen-date').textContent = selectedDateTime; // Отображение даты и времени на странице выбора
        goToPage(3); // Переход на страницу вопроса "Приехать?"
    } else {
        alert('Пожалуйста, выберите дату и время');
    }
});

// Обработчик для вопроса о приезде (Да)
document.getElementById('confirm-arrival-btn').addEventListener('click', function () {
    arrivalResponse = 'Супер! Приеду, обнял!'; // Сохранение ответа
    createHeart(this); // Создаем сердечко при нажатии
    goToPage(4); // Переход на страницу подтверждения
    displaySummary(); // Отображение итогового сообщения
});

// Обработчик для вопроса о приезде (Нет)
document.getElementById('non-arrival-btn').addEventListener('click', function () {
    arrivalResponse = 'Хорошо, жду!'; // Сохранение ответа
    goToPage(4); // Переход на страницу подтверждения
    displaySummary(); // Отображение итогового сообщения
});

// Функция для отображения итогового сообщения
function displaySummary() {
    const summaryMessage = document.getElementById('chosen-date');
    summaryMessage.textContent = arrivalResponse + ' Встречаемся ' + selectedDateTime; // Установка сообщения в зависимости от ответа и отображение времени
}