const surveyContainer = document.getElementById('survey-container');
const questions = [
    {
        text: 'Вы любите программирование?',
        options: [
            { value: 'yes', text: 'Да' },
            { value: 'no', text: 'Нет' }
        ],
        onChange: (event) => {
            if (event.target.value === 'yes') {
                createQuestion(questions[1]); // Создаем следующий вопрос
            } else {
                createSubmitButton();
            }
        }
    },
    {
        text: 'Какой язык программирования вы предпочитаете?',
        options: [
            { value: 'javascript', text: 'JavaScript' },
            { value: 'python', text: 'Python' },
            { value: 'java', text: 'Java' },
            { value: 'csharp', text: 'C#' }
        ],
        onChange: (event) => {
            createQuestion(questions[2]); // Создаем следующий вопрос
        }
    },
    {
        text: 'Какой у вас опыт в программировании?',
        options: [
            { value: 'beginner', text: 'Начинающий' },
            { value: 'intermediate', text: 'Средний' },
            { value: 'expert', text: 'Эксперт' }
        ],
        onChange: (event) => {
            createQuestion(questions[3]); // Создаем следующий вопрос
        }
    },
    {
        text: 'У вас есть работа?',
        options: [
            { value: 'no', text: 'Нет' },
            { value: 'yes', text: 'Есть' },

        ],
        onChange: (event) => {
            if (event.target.value === 'no') {
                createQuestion(questions[4]);
            } else {
                createSubmitButton();
            }

        }
    },
    {
        text: 'Вы бы  хотели начать работать?',
        options: [
            { value: 'no', text: 'Нет' },
            { value: 'yes', text: 'Да' },
        ],
        onChange: (event) => {
            if (event.target.value === 'yes') {
                createQuestion(questions[5]);
            } else {
                createSubmitButton();
            }
        }
    },
    {
        text: 'Какую вы хотите зарплату',
        options: [
            { value: 'small', text: '50к рублей ' },
            { value: 'meduim', text: '70к рублей' },
            { value: 'big', text: '100к+ рублей' }
        ],
        onChange: (event) => {
            // Здесь можно добавить обработчик, если необходимо
            createQuestion(questions[6]); // Создаем следующий вопрос
        }
    },
    {
        text: 'Вы бы хотели работать из дома или в офисе?',
        options: [
            { value: 'home', text: 'Из дома ' },
            { value: 'office', text: 'В офисе' },
        ],
        onChange: (event) => {
            if (event.target.value === 'home') {
                createQuestion(questions[7]);
            } else {
                createQuestion(questions[8]);
            }
        }

    },
    {
        text: 'Свободный график или фиксированная рабочая неделя?',
        options: [
            { value: 'free', text: 'Свободный' },
            { value: 'fixed', text: 'Фиксированный' },
        ],
        onChange: (event) => {
         
            createSubmitButton();
        }

    }, {
        text: 'Какой график вы бы хотели',
        options: [
            { value: 'fiveWorkDays', text: '5/2' },
            { value: 'twoWorkDays', text: '2/2' },
        ],
        onChange: (event) => {
            createSubmitButton();
        }

    }
];






// Вспомогательная функция для создания элемента
function createElement(type, attributes = {}, textContent = '') {
    const element = document.createElement(type);
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

// Функция для генерации уникального идентификатора
function generateId(text) {
    // Проверка на наличие входных данных
    if (typeof text !== 'string') {
        console.warn('Invalid input for generateId, generating a default ID.');
        return 'id-' + Date.now(); // Возвращаем временный ID, если входной текст некорректен
    }

    // Удаляем лишние пробелы и проверяем, не является ли текст пустым
    const trimmedText = text.trim();
    if (trimmedText === '') {
        console.warn('Empty string provided for generateId, generating a default ID.');
        return 'id-' + Date.now(); // Возвращаем временный ID, если входной текст пуст
    }

    // Преобразуем текст в уникальный идентификатор
    const sanitizedText = trimmedText
        .toLowerCase() // Приводим к нижнему регистру
        .replace(/[^a-z0-9\s]/g, '') // Удаляем все символы, кроме букв, цифр и пробелов
        .replace(/\s+/g, '-'); // Заменяем пробелы на дефисы

    // Генерация уникального идентификатора
    const uniqueId = `id-${sanitizedText}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    console.log(`Generated ID: ${uniqueId}`); // Лог для проверки сгенерированного ID
    return uniqueId;
}
// Функция для создания вопросов
function createQuestion({ text, options, onChange }) { // Изменено questionText на text
    const questionDiv = createElement('div', { class: 'question' });
    const questionId = generateId(text); // Генерация уникального id

    const questionLabel = createElement('label', { for: questionId }, text); // Изменено questionText на text
    questionDiv.appendChild(questionLabel);
    console.log(options); // Лог для проверки создания вопроса
    
    options.forEach(option => {
        const inputId = option.value; // Используем значение варианта как id
        const input = createElement('input', { type: 'radio', id: inputId, name: questionId, value: inputId });
        const label = createElement('label', { for: inputId }, option.text);
        questionDiv.append(input, label);
    });
    
    surveyContainer.appendChild(questionDiv);
    questionDiv.addEventListener('change', onChange);
    console.log(`Created question: ${text}`); // Изменено questionText на text
}

// Вопросы и их обработчики


// Функция для создания кнопки отправки
function createSubmitButton() {
    const submitButton = createElement('button', {}, 'Отправить');
    surveyContainer.appendChild(submitButton);
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Ваши ответы отправлены!');
    });
    console.log('Submit button created.'); // Лог для проверки создания кнопки
}

// Запускаем создание первого вопроса

document.addEventListener('DOMContentLoaded', () => {
    createQuestion(questions[0]);
    
})