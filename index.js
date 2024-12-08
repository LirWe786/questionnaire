document.addEventListener('DOMContentLoaded', () => {
    const surveyContainer = document.getElementById('survey-container');

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
    function createQuestion({ questionText, options, onChange }) {
        const questionDiv = createElement('div', { class: 'question' });
        const questionId = generateId(questionText); // Генерация уникального id

        const questionLabel = createElement('label', { for: questionId }, questionText);
        questionDiv.appendChild(questionLabel);

        options.forEach(option => {
            const inputId = option.value; // Используем значение варианта как id
            const input = createElement('input', { type: 'radio', id: inputId, name: questionId, value: inputId });
            const label = createElement('label', { for: inputId }, option.text);
            questionDiv.append(input, label);
        });

        surveyContainer.appendChild(questionDiv);
        questionDiv.addEventListener('change', onChange);
        console.log(`Created question: ${questionText}`); // Лог для проверки созданного вопроса
    }

    // Вопросы и их обработчики
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
                    alert('Спасибо за участие!');
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
                createQuestion(questions[2].text,questions[2].options,questions[2].onChange); // Создаем следующий вопрос
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
                if(event.target.value === 'yes') {
                    createQuestion(questions[4]);
                }else{
                    alert('Спасибо за Ваше время!');
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
                if(event.target.value === 'yes') {
                    createQuestion(questions[5]);
                }else{
                    alert('Спасибо за Ваше время!');
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
                { value: 'home', text: 'Из дома ' },
                { value: 'office', text: 'В офисе' },
            ],
            onChange: (event) => {
                alert('Спасибо за Ваше время!');
            }

        }, {
            text: 'Какой график вы бы хотели',
            options: [
                { value: 'home', text: 'Из дома ' },
                { value: 'office', text: 'В офисе' },
            ],
            onChange: (event) => {
                alert('Спасибо за Ваше время!');
            }

        }
    ];

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
    createQuestion(questions[0]);
    createSubmitButton();
});