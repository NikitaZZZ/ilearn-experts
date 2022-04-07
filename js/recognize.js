// Голос бота
const voices = window.speechSynthesis.getVoices();

// Функция для говора текста
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(`${text}`);        
  utterance.lang = "ru-RU";
  speechSynthesis.speak(utterance);
}

// Данные для распознования текста
const phrasesMainPage = [
    {
        possibleUserPhrases: ['Открой тесты', 'Открой ITests', 'Открой ITest', 'создать тест', 'новый тест', 'тесты'],
        func: () => user.who == 'teacher' ? location.href = 'itests.html' : location.href = 'tests.html'
    },
    {
        possibleUserPhrases: ['Открой чаты', 'Открой сообщения', 'Сообщения', 'Сообщение', 'Чаты', 'LAR Чат',],
        func: () => new bootstrap.Modal(document.getElementById('chat')).show()
    },
    {
        possibleUserPhrases: ['Открой заметки', 'Заметки', 'напоминания', 'напоминание', 'Создать заметку', 'Новая заметка'],
        func: () => user.who == 'teacher' ? new bootstrap.Modal(document.getElementById('todo')).show() : console.log('nooo')
    },
    {
        possibleUserPhrases: ['Открой мой класс', 'Мой класс', 'Класс', 'открой класс'],
        func: () => user.who == 'teacher' ? new bootstrap.Offcanvas(document.getElementById('myClass')).show() : console.log('nooo')
    },
    {
        possibleUserPhrases: ['Открой мою школу', 'Школа', 'Моя школа', 'открой школу', 'найти ученика', 'ученики', 'Ученики школы'],
        func: () => user.who == 'teacher' ? new bootstrap.Offcanvas(document.getElementById('mySchool')).show() : console.log('nooo')
    },
    {
        possibleUserPhrases: ['Выйти', 'выйди', 'выйти из аккаунта', 'выход из аккаунта', 'выйти из профиля', 'выход из профиля'],
        func: () => user.who == 'teacher' ? signOutTeacher() : signOutStudent()
    },
    {
        possibleUserPhrases: ['Выйти', 'выйди', 'выйти из аккаунта', 'выход из аккаунта', 'выйти из профиля', 'выход из профиля'],
        func: () => user.who == 'teacher' ? signOutTeacher() : signOutStudent()
    },
    {
        possibleUserPhrases: ['сколько заметок', 'число заметок', 'сколько задач', 'сколько незаконченных заметок'],
        func: () => user.who == 'teacher' ? speak(`Число незаконченных дел: ${ILVue.tasks.length}`) : console.log('noooo')
    },
];

// Получаем инструменты для распознования текста
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

// Создаем константы для инициализации инструментов распознования
let recognition, speechRecognitionList;

// Инициализируем инструменты. Если браузер пользователя не поддерживает их, сайт проинформирует об этом.
try {
    // Инициализация
    recognition = new SpeechRecognition();
    speechRecognitionList = new SpeechGrammarList();

    // Настраиваем: язык, промежуточный результат, альтернатива распознанному тексту
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Переменная для фиксирования: идет запись голосовой команды или нет
    let record = false;

    // Получаем кнопку микрофона, для старта/остановки записи
    const assistantBtnNonActive = document.getElementById('assistant-btn-non-active');

    // Вешаем событие онклик на кнопку: начинаем запись
    assistantBtnNonActive.onmousedown = function () { 
        // Проверяем, идет запись или нет 
        record = record == true ? false : true;

        // Если запись не идет
        if (!record) {
            // Начинаем прослушивание
            recognition.start();

            // Меняем стили кнопки на "активную"
            this.id = "assistant-btn-active";
        } else if (record) { recognition.stop() } // Если запись идет, то останавливаем ее
    };
    
    // Получаем span для вывода того, что сказал пользователь
    const textSpeech = document.getElementById('speech-text');

    // Получаем результат сказанного
    recognition.onresult = (event) => {
        // Меняем стили кнопки на "неактивную"
        assistantBtnNonActive.id = "assistant-btn-non-active";
        // Показываем текст результата
        textSpeech.style.display = "block";
        // Вставляем текст, который сказал пользователь, в span
        textSpeech.innerText = event.results[0][0].transcript;

        // Перебор объектов команд из массива
        for (let i = 0; i < phrasesMainPage.length; i++) {
            // Перебор массива разных вариаций фраз от юзера в объекте команды
            for (let j = 0; j < phrasesMainPage[i].possibleUserPhrases.length; j++) {
                // Получаем из массива фразу, убираем пробелы + ставим ее в нижний регистр
                const phraseFromArray = phrasesMainPage[i].possibleUserPhrases[j].trim().toLowerCase(); 
                // Получаем фразу от юзера, убираем пробелмы + ставим ее в нижний регистр
                const phraseFromUser = event.results[0][0].transcript.trim().toLowerCase();

                // Проверяем, сходится ли фраза команды и то, что сказал юзер
                if (deletePointFromStr(phraseFromUser) == phraseFromArray) phrasesMainPage[i].func();
            }
        }

        // Через 2 сек скрываем сказанный текст (span)
        setTimeout(() => { textSpeech.style.display = "none"; }, 2000);
    };
} catch {
    // Информируем пользователя о недоступности функции
    
    // Проверка: отказался ли юзер от информирования о недоступности Infinity Helper
    if (!localStorage.getItem('hideInfoSR')) {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка!',
            showDenyButton: true,
            denyButtonText: 'Скрыть предупреждение',
            html: `Ваш браузер не поддерживает SpeechRecognition. <br />
                Он нужен для распознования текста. <br />
                Эта функция будет для вас недоступна. <br /> <br />
    
                Список поддерживаемых браузеров: <br />
                    Chrome (версия 33+; +Android) <br />
                    Edge (версия 79+; +Android) <br />
                    Safari (версия 14.1+; +Android) <br />
            `,
        }).then((result) => {
            // Если пользователь нажал на кнопку 'скрыть предупреждение' => Swal.fire (предупреждения) не будет
            if (result.isDenied) { localStorage.setItem('hideInfoSR', true); } 
        });
    }

    // Скрываем div микрофона
    document.getElementsByClassName('assistant')[0].style.display = 'none';
}










































    // Инициализация
//     recognition = new SpeechRecognition();
//     speechRecognitionList = new SpeechGrammarList();

//     // Настраиваем: язык, промежуточный результат, альтернатива распознанному тексту
//     recognition.lang = 'ru-RU';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     // Переменная для фиксирования: идет запись голосовой команды или нет
//     let record = false;

//     // Получаем кнопку микрофона, для старта/остановки записи
//     const assistantBtnNonActive = document.getElementById('assistant-btn-non-active');




    
// class IHelper {
//     constructor(allPhrases, parentElem) {
//         this.allPhrases = allPhrases;
//         this.parentElem = parentElem;
        
//     }

//     createMicroElem() {
//         let span = document.createElement('span'); // for inner text result
//         let button = document.createElement('button'); // for start record speech
//         let iInButton = document.createElement('i'); // for icon 'micro'

//         button.id = "assistant-btn-non-active";
//         button.title = "Дать команду";
//         iInButton.className = "fas fa-microphone";

//         this.parentElem.appendChild(span);
//         this.parentElem.appendChild(button);
//         button.appendChild(iInButton);
//     }

//     initCommands() {

//     }
// }

// let IH = new IHelper(['asd'], document.getElementById('app'));
// IH.createMicroElem();