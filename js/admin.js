// INNER FOR HTML
let results_students_inner_adm = document.getElementById("results_students_table");

// MAS FOR RESULTS STUDENTS
let results_students_mas_right = [];
let results_students_mas_wrong = [];
let results_students_mas = [];
let number_student = 0;

// MAS FOR TESTS
let tests_mas = [];

// Переменная для нумерации вопросов
number_test = 0;

// number of question
let question_number = 0;
let question_number_show = 0;

// number of question for BIG test EGE
let question_numberBIG = 0;
let question_number_showBIG = 0;

// correct answer for test
let correct_answer = 0;

// massive for questions
let questions_massive = [];

// massive for BIG test for EGE
let questions_massiveBIG = [];

// Нумерация
let number_numer = 0;

// оценка
let appraisal = 0;

// user (teacher)
const user = JSON.parse(localStorage.getItem('user'));

// unique id for test
let idTest;

// For db
let quantity_img;

// show teachers tests
window.onload = () => tests();

// Enter tests for teacher
function tests() {
    const subjectDivs = document.querySelectorAll('.subjectDivs');
    for (let i = 0; i < subjectDivs.length; i++) {
        subjectDivs[i].innerHTML = ``;
    }

    tests_mas = [];

    // elements
    let algebra = document.getElementById('algebra');
    let math = document.getElementById('math');
    let english = document.getElementById('english');
    let biology = document.getElementById('biology');
    let world = document.getElementById('world');
    let geography = document.getElementById('geography');
    let geometry = document.getElementById('geometry');
    let history = document.getElementById('history');
    let literature = document.getElementById('literature');
    let physics = document.getElementById('physics');
    let alchemy = document.getElementById('alchemy');
    let russian = document.getElementById('russian');
    let lsf = document.getElementById('lsf');
    let ss = document.getElementById('ss');
    let pe = document.getElementById('pe');
    let tech = document.getElementById('tech');
    let it = document.getElementById('it');

    let algebraCounter = document.getElementById('algebra-counter');
    let mathCounter = document.getElementById('math-counter');
    let englishCounter = document.getElementById('english-counter');
    let biologyCounter = document.getElementById('biology-counter');
    let worldCounter = document.getElementById('world-counter');
    let geographyCounter = document.getElementById('geography-counter');
    let geometryCounter = document.getElementById('geometry-counter');
    let historyCounter = document.getElementById('history-counter');
    let literatureCounter = document.getElementById('literature-counter');
    let physicsCounter = document.getElementById('physics-counter');
    let alchemyCounter = document.getElementById('alchemy-counter');
    let russianCounter = document.getElementById('russian-counter');
    let lsfCounter = document.getElementById('lsf-counter');
    let ssCounter = document.getElementById('ss-counter');
    let peCounter = document.getElementById('pe-counter');
    let techCounter = document.getElementById('tech-counter');
    let itCounter = document.getElementById('it-counter');

    algebra_counter = 0;
    math_counter = 0;
    english_counter = 0;
    biology_counter = 0;
    world_counter = 0;
    geography_counter = 0;
    geometry_counter = 0;
    history_counter = 0;
    literature_counter = 0;
    physics_counter = 0;
    alchemy_counter = 0;
    russian_counter = 0;
    lsf_counter = 0;
    ss_counter = 0;
    tech_counter = 0;
    pe_counter = 0;
    it_counter = 0;

    let question_number_admin = 0;

    // id test
    idTest = getRandId();

    // Library initialization upload-form
    upload('#file-formup', {
        multi: true,
        accept: ['.png', '.jpg', '.jpeg', '.gif'],
        onUpload(files, blocks) {
            quantity_img = files.length;
            files.forEach((file, index) => {
                    let filedb = files[index];

                    console.log(files);

                    const ref = firebase.storage().ref(`/test${idTest}/` + `question${index}`);
                    const task = ref.put(filedb);

                    task.on('state_changed', snapshot => {
                        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                        const block = blocks[index].querySelector('.preview-info-progress');
                        block.textContent = percentage;
                        block.style.width = percentage + '%';

                    }, error => {
                        console.log(error);
                    }, () => {
                        console.log('Complete')
                    })

                    //firebase.storage().ref(`/test${idTest}/` + `question${i}`).put(filedb);
            })
        }
    })


    firebase.database().ref(`school${user.school}/tests/${user.myClass}/`).on('child_added', (data) => {
        const id = data.val().idTest;
        const klass_fb = data.val().klass;
        const questions_db = data.val().questions;
        const subject_fb = data.val().subject;
        const theme_fb = data.val().theme;
        const qua_img_fb = data.val().qua_img;


        switch (subject_fb) {
            case 'Алгебра':
                algebra_counter += 1;
                algebra.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Математика':
                math_counter += 1;
                math.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Английский язык':
                english_counter += 1;
                english.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Биология':
                biology_counter += 1;
                biology.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Окружающий мир':
                world_counter += 1;
                world.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'География':
                geography_counter += 1;
                geography.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Геометрия':
                geometry_counter += 1;
                geometry.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'История':
                history_counter += 1;
                history.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Литература':
                literature_counter += 1;
                literature.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Физика':
                physics_counter += 1;
                physics.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Химия':
                alchemy_counter += 1;
                alchemy.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Русский язык':
                russian_counter += 1;
                russian.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'ОБЖ':
                lsf_counter += 1;
                lsf.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Физическая культура':
                pe_counter += 1;
                pe.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Технология':
                tech_counter += 1;
                tech.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Обществознание':
                ss_counter += 1;
                ss.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
            case 'Информатика':
                it_counter += 1;
                it.innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Предмет</th>
                                <th scope="col">Класс</th>
                                <th scope="col">Тема</th>
                                <th scope="col">Открыть тест</th>
                                <th scope="col">Удалить тест</th>
                            </tr>
                        </thead>
                        <tbody id="tests_inner">
                            <tr id="test${id}">
                                <td id="subject-test">${subject_fb}</td>
                                <td id="klass-test">${klass_fb}</td>
                                <td id="theme-test">${theme_fb}</td>
                                <td id="theme-test" style="padding: 0.9em;">
                                <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                    Открыть тест
                                </button>
                                </td>
                                <td id="delete-test">
                                    <button class="btn btn-outline-danger" onclick="deleteTest('${id}', '${klass_fb}')" id="delete-test">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>

                        <div id="testCollapseDiv${id}" class="collapse"></div>
                    </table>
                `;
                break;
        }

        algebraCounter.innerHTML = algebra_counter;
        mathCounter.innerHTML = math_counter;
        englishCounter.innerHTML = english_counter;
        biologyCounter.innerHTML = biology_counter;
        worldCounter.innerHTML = world_counter;
        geographyCounter.innerHTML = geography_counter;
        geometryCounter.innerHTML = geometry_counter;
        historyCounter.innerHTML = history_counter;
        literatureCounter.innerHTML = literature_counter;
        physicsCounter.innerHTML = physics_counter;
        alchemyCounter.innerHTML = alchemy_counter;
        russianCounter.innerHTML = russian_counter;
        lsfCounter.innerHTML = lsf_counter;
        techCounter.innerHTML = tech_counter;
        ssCounter.innerHTML = ss_counter;
        itCounter.innerHTML = it_counter;
        peCounter.innerHTML = pe_counter;

        document.getElementById(`testCollapseDiv${id}`).innerHTML = `
            <div id="testCollapse${id}">
                <h4 style="margin-left: 1.5em; margin-top: 0.5em; padding-bottom: 0; margin-bottom: 0;" id="title-test">Тест: ${theme_fb}</h4>
                

                    <div class="swiper">
                        <div class="swiper-wrapper" id="collapsesQuestionsimg${id}">
                        </div>

                        <!-- If we need pagination -->
                        <div class="swiper-pagination"></div>

                        <!-- If we need navigation buttons -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>

                    </div>

                    <div id="collapsesQuestions${id}"></div>


            </div>
        `;

        // Cycle output imf for BIG test
        for (let i = 0; i < qua_img_fb; i++) {
            if (theme_fb == ("ЕГЭ" || "ОГЭ" || "ВПР")) {
                document.getElementById(`collapsesQuestionsimg${id}`).innerHTML += `
                    <img class="swiper-slide" alt="imageTest" id="image-test${id}${i}"/>
            `;

            }
        }

        // code for swiper intintial
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            //direction: 'vertical',
            //loop: true,

            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        for (let i = 0; i < questions_db.length; i++) {
            const current_question_number = question_number_admin;

            if (questions_db[question_number_admin].option_1 != undefined) {
                document.getElementById(`collapsesQuestions${id}`).innerHTML += `
                    <div id="testCollapseQuestons${id}" style="margin-left: 4em">
                        <p class="lead ml-3" style='margin-bottom: 0; margin-top: 0; padding-top: 0;' id="question">Вопрос: ${questions_db[question_number_admin].input_question}</p>
        
                        <img alt="imageTest" style="width: 30%" class="img-fluid" id="image-test${question_number_admin}">
        
                        <div class="form-check" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_div">
                            <p class="text-danger" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_text${id}${question_number_admin}">1) ${questions_db[question_number_admin].option_1}</p>
                        </div>
                        <div class="form-check" style='padding-top: 0; margin-top: 0.3em; margin-bottom: 0;' id="option2_div">
                            <p class="text-danger" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option2_text${id}${question_number_admin}">2) ${questions_db[question_number_admin].option_2}</p>
                        </div>
                        <div class="form-check" style='padding-top: 0; margin-top: 0.3em; margin-bottom: 0;' id="option3_div">
                            <p class="text-danger" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option3_text${id}${question_number_admin}">3) ${questions_db[question_number_admin].option_3}</p>
                        </div>
                        <div class="form-check" style='padding-top: 0; margin-top: 0.3em;' id="option4_div">
                            <p class="text-danger" style='padding-top: 0; margin-top: 0; padding-bottom: 1.5em' id="option4_text${id}${question_number_admin}">4) ${questions_db[question_number_admin].option_4}</p>
                        </div>
                    </div>
                `;

                switch (questions_db[question_number_admin].correct_answer) {
                    case 1:
                        document.getElementById(`option1_text${id}${question_number_admin}`).className = 'text-success';
                        break;
                    case 2:
                        document.getElementById(`option2_text${id}${question_number_admin}`).className = 'text-success';
                        break;
                    case 3:
                        document.getElementById(`option3_text${id}${question_number_admin}`).className = 'text-success';
                        break;
                    case 4:
                        document.getElementById(`option4_text${id}${question_number_admin}`).className = 'text-success';
                        break;
                }
            } else if (theme_fb != ("ЕГЭ" || "ОГЭ" || "ВПР")) {
                document.getElementById(`collapsesQuestions${id}`).innerHTML += `
                    <div id="testCollapseQuestons${id}" style="margin-left: 4em">
                        <p class="lead ml-3" style='margin-bottom: 0; margin-top: 0; padding-top: 0;' id="question">Вопрос: ${questions_db[question_number_admin].input_question}</p>
        
                        <img alt="imageTest" style="width: 30%" class="img-fluid" id="image-test${question_number_admin}">
        
                        <div class="form-check" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_div">
                            <p class="text-success" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_text${id}">${questions_db[question_number_admin].correct_answer}</p>
                        </div>
                    </div>
                `;
            } else if (theme_fb == ("ЕГЭ" || "ОГЭ" || "ВПР")) {
                document.getElementById(`collapsesQuestions${id}`).innerHTML += `
                    <div id="testCollapseQuestons${id}" style="margin-left: 4em">
                        <p class="lead ml-3" style='margin-bottom: 0; margin-top: 0; padding-top: 0;' id="question">Вопрос: ${questions_db[question_number_admin].input_question}</p>
        
                        <div class="form-check" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_div">
                            <p class="text-success" style='padding-top: 0; margin-top: 0; margin-bottom: 0;' id="option1_text${id}">${questions_db[question_number_admin].correct_answer}</p>
                        </div>
                    </div>
                `;
            }

            // Loading img for BIG test for EGE
            for (let i = 0; i < qua_img_fb; i++) {
                let imageBIG = firebase.storage().ref(`/test${id}/question${i}`);
                if (theme_fb == ("ЕГЭ" || "ОГЭ" || "ВПР")) {

                    imageBIG.getDownloadURL().then((url) => {
                        let image_test = document.getElementById(`image-test${id}${i}`);
                        image_test.src = url;
                    }).catch((error) => {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                let image_test_onf = document.getElementById(`image-test${id}`);
                                image_test_onf.parentNode.removeChild(image_test_onf);
                                break;

                            case 'storage/unauthorized':
                                let image_test_uaz = document.getElementById(`image-test${id}`);
                                image_test_uaz.parentNode.removeChild(image_test_uaz);
                                break;
                            case 'storage/canceled':
                                let image_test_ccd = document.getElementById(`image-test${id}`);
                                image_test_ccd.parentNode.removeChild(image_test_ccd);
                                break;
                            case 'storage/unknown':
                                let image_test_unk = document.getElementById(`image-test${id}`);
                                image_test_unk.parentNode.removeChild(image_test_unk);
                                break;
                        }
                    });

                }
            }

            // Loading img for normal test
            let image = firebase.storage().ref(`/test${id}/question${question_number_admin}`);
            if (theme_fb != ("ЕГЭ" || "ОГЭ" || "ВПР")) {
                image.getDownloadURL().then((url) => {
                    let image_test = document.getElementById(`image-test${current_question_number}`);
                    image_test.src = url;
                }).catch((error) => {
                    switch (error.code) {
                        case 'storage/object-not-found':
                            let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                            image_test_onf.parentNode.removeChild(image_test_onf);
                            break;

                        case 'storage/unauthorized':
                            let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                            image_test_uaz.parentNode.removeChild(image_test_uaz);
                            break;
                        case 'storage/canceled':
                            let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                            image_test_ccd.parentNode.removeChild(image_test_ccd);
                            break;
                        case 'storage/unknown':
                            let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                            image_test_unk.parentNode.removeChild(image_test_unk);
                            break;
                    }
                });
            }

            question_number_admin += 1;
        }

        question_number_admin = 0;
    });
}

// List for results students
function resultsStudentsList() {
    results_students_mas = [];
    results_students_inner_adm.innerHTML = '';
    number_student = 0;

    firebase.database().ref(`school${user.school}/tests/${user.myClass}`).on('value', (snapshot) => {
        for (let key in snapshot.val()) {
            firebase.database().ref(`school${user.school}/tests/${user.myClass}/${key}/results`).on('child_added', (data) => {
                const appraisal = data.val().appraisal;
                const fullNameStudent = data.val().fullName;
                const result = data.val().result;
                const idTest = data.val().idTest;

                number_student++;

                results_students_inner_adm.innerHTML += `
                    <tr id="resultTest${idTest}">
                        <td>${number_student}</td>
                        <td>${fullNameStudent}</td>
                        <td>${result[0].klass}</td>
                        <td>${result[0].test_subject}</td>
                        <td>${result[0].test_theme}</td>
                        <td>${result[0].date}</td>
                        <td id="result-inner-${number_student}">
                            <div id="appraisalDiv${idTest}" class="appraisal alert">
                                <p id="text-appraisal">${appraisal}</p>
                            </div>
                        </td>
                        <td id="delete-test">
                            <button id="delete-test-btn" class="btn btn-outline-danger" onclick="deleteResult(${idTest}, '${fullNameStudent}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;

                switch (appraisal) {
                    case 2:
                        document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-danger";
                        break;
                    case 3:
                        document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-warning";
                        break;
                    case 4:
                        document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-primary";
                        break;
                    case 5:
                        document.getElementById(`appraisalDiv${idTest}`).className = "appraisal alert alert-success";
                        break;
                }
            });
        }
    });
}

function searchInput(id) {
    const input = document.getElementById(`search${id}`).value.toLowerCase();
    const tr = document.getElementsByTagName('tr');

    // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
    for (i = 0; i < tr.length; i++) {
        try {
            const td = tr[i].getElementsByClassName(`${id}`)[0].innerHTML.toLowerCase();

            if (td.indexOf(input) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        } catch { }
    }
}

// пользователь выбрал: письменный ответ (true) / выбор ответа (false)
let cCQ = false;

// Создание Вопроса
function createQuestion() {
    let questionsDiv = document.getElementById("questions");
    let correctAnswer = 0;
    idTest = getRandId();

    const answerOptionsForm = document.querySelector('#answerOptions-form');
    const writtenResponseForm = document.querySelector('#writtenResponse-form');
    const inputQuestion = document.querySelector("#input_question").value;

    if (!cCQ) {
        if (answerOptionsForm[4].checked) { } else {
            let file = document.getElementById("files").files[0];
            firebase.storage().ref(`/test${idTest}/` + `question${question_number}`).put(file);
        }

        if (answerOptionsForm[0].checked === true) {
            correctAnswer = 1;
        } else if (answerOptionsForm[2].checked === true) {
            correctAnswer = 2;
        } else if (answerOptionsForm[4].checked === true) {
            correctAnswer = 3;
        } else if (answerOptionsForm[6].checked === true) {
            correctAnswer = 4;
        }

        let object_question = {
            input_question: inputQuestion,
            option_1: answerOptionsForm[1].value,
            option_2: answerOptionsForm[3].value,
            option_3: answerOptionsForm[5].value,
            option_4: answerOptionsForm[7].value,
            correct_answer: correctAnswer
        };

        questions_massive.push(object_question);
        question_number_show += 1;

        document.getElementById('questions-links').innerHTML += ` 
            <li class="nav-item ml-2 d-inline-block" style="list-style-type: none">
                 <a class="nav-link mt-2" id="pills-test${question_number}-tab" data-bs-toggle="collapse" href="#pills-test${question_number}" role="tab" aria-controls="pills-plus" aria-selected="false">Вопрос ${question_number_show}</a>
            </li>
        `;

        questionsDiv.innerHTML += `
          <div class="collapse" id="pills-test${question_number}">
            <div class="card text-center">
              <div class="card-header">
                <h5 class="card-title" style="margin-bottom: 0; padding-bottom: 0;">${questions_massive[question_number].input_question}</h5>
              </div>
              <div class="card-body">
                <p class="card-text">1) ${questions_massive[question_number].option_1}</p>
                <p class="card-text">2) ${questions_massive[question_number].option_2}</p>
                <p class="card-text">3) ${questions_massive[question_number].option_3}</p>
                <p class="card-text">4) ${questions_massive[question_number].option_4}</p>
                <h5 class="card-title">Правильный ответ: ${questions_massive[question_number].correct_answer}</h5>
              </div>
            </div>
          </div>
        `;

        answerOptionsForm.reset();
    } else {
        if (writtenResponseForm[1].checked) { } else {
            let file = writtenResponseForm[0].files[0];
            firebase.storage().ref(`/test${idTest}/` + `question${question_number}`).put(file);
        }

        questions_massive.push({
            input_question: inputQuestion,
            correct_answer: writtenResponseForm[2].value
        });

        question_number_show++;

        document.getElementById('questions-links').innerHTML += ` 
            <li class="nav-item ml-2 d-inline-block" style="list-style-type: none">
                <a class="nav-link mt-2" id="pills-test${question_number}-tab" data-bs-toggle="collapse" href="#pills-test${question_number}" role="tab" aria-controls="pills-plus" aria-selected="false">Вопрос ${question_number_show}</a>
            </li>
        `;

        questionsDiv.innerHTML += `
            <div class="collapse" id="pills-test${question_number}">
                <div class="card text-center">
                    <div class="card-header">
                        <h5 class="card-title" style="margin-bottom: 0; padding-bottom: 0;">${questions_massive[question_number].input_question}</h5>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Правильный ответ: ${questions_massive[question_number].correct_answer}</h5>
                    </div>
                </div>
            </div>
        `;

        writtenResponseForm.reset();
    }

    // let input_question = document.getElementById("input_question").value;
    // let option_radio1 = document.getElementById("option_radio1");
    // let option_radio2 = document.getElementById("option_radio2");
    // let option_radio3 = document.getElementById("option_radio3");
    // let option_radio4 = document.getElementById("option_radio4");
    // let option_1 = document.getElementById("inputText1").value;
    // let option_2 = document.getElementById("inputText2").value;
    // let option_3 = document.getElementById("inputText3").value;
    // let option_4 = document.getElementById("inputText4").value;
    // let checkbox_file = document.getElementById("checkbox_file");

    question_number += 1;
}

// Create test for general using
function createTest() {
    let subject = document.getElementById("subject").value;
    let theme = document.getElementById("theme").value;
    let klass = document.getElementById("klass").value;

    try {
        let timerNeed = document.getElementById('timerNeed');
        let timerMinutes = document.getElementById('timerMinutes').value;
        let timerSeconds = document.getElementById('timerSeconds').value;
    } catch { }

    if (timerNeed.checked) {
        if (timerSeconds === "") {
            timerSeconds = 0;
        } else if (timerMinutes === "") {
            timerMinutes = 0;
        }

        firebase.database().ref(`school${user.school}/tests/${klass}/test${idTest}`).set({
            subject: subject,
            theme: theme,
            klass: klass,
            idTest: idTest,
            questions: questions_massive,
            timer: true,
            timerMinutes: timerMinutes,
            timerSeconds: timerSeconds
        });
    } else {
        firebase.database().ref(`school${user.school}/tests/${klass}/test${idTest}`).set({
            subject: subject,
            theme: theme,
            klass: klass,
            idTest: idTest,
            questions: questions_massive,
        });
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Вы успешно создали тест!',
        showConfirmButton: false,
        timer: 2000,
    });

    setTimeout(() => location.reload(), 2000);
}

// create question for test EGE
function createQuestionBIGTest() {

    let questionsDiv = document.getElementById("questionsBIG");
    let correctAnswer = 0;

    const writtenResponseForm = document.querySelector('#writtenResponse-formBIG');
    const inputQuestion = document.querySelector("#input_questionBIG").value;
    console.log(writtenResponseForm);
    console.log(inputQuestion);

    // if (writtenResponseForm[1].checked) { } else {
    //     let file = writtenResponseForm[0].files[0];
    //     firebase.storage().ref(`/test${idTest}/` + `question${question_numberBIG}`).put(file);
    // }

    questions_massiveBIG.push({
        input_question: inputQuestion,
        correct_answer: writtenResponseForm[1].value,
    });

    question_number_showBIG++;

    document.getElementById('questions-linksBIG').innerHTML += ` 
        <li class="nav-item ml-2 d-inline-block" style="list-style-type: none">
            <a class="nav-link mt-2" id="pills-test${question_numberBIG}-tab" data-bs-toggle="collapse" href="#pills-test${question_numberBIG}" role="tab" aria-controls="pills-plus" aria-selected="false">Вопрос ${question_number_showBIG}</a>
        </li>
    `;

    questionsDiv.innerHTML += `
        <div class="collapse" id="pills-test${question_numberBIG}">
            <div class="card text-center">
                <div class="card-header">
                    <h5 class="card-title" style="margin-bottom: 0; padding-bottom: 0;">${questions_massiveBIG[question_numberBIG].input_question}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Правильный ответ: ${questions_massiveBIG[question_numberBIG].correct_answer}</h5>
                </div>
            </div>
        </div>
    `;

    writtenResponseForm.reset();
    question_numberBIG += 1;
}

// Create test for general using
function createTestBIGdb() {

    const writtenResponseFormimg = document.querySelector('#writtenResponse-formBIGimg');

    let subject = document.getElementById("subjectBIG").value;
    let theme = document.getElementById("themeBIG").value;
    let klass = document.getElementById("klassBIG").value;


    // let quantity_img = document.getElementById("filesBIG").files.length

    // if (writtenResponse_formBIGimg[0].checked) { } else {
    //     console.log(quantity_img);
    //     //let file = writtenResponse_formBIGimg[0].files[0];
    //     for (let i = 0; i < quantity_img; i++) {
    //         let file = document.getElementById("filesBIG").files[i];
    //         console.log(file);
    //         firebase.storage().ref(`/test${idTest}/` + `question${i}`).put(file);
    //     }
    // }

    try {
        let timerNeed = document.getElementById('timerNeed');
        let timerMinutes = document.getElementById('timerMinutes').value;
        let timerSeconds = document.getElementById('timerSeconds').value;
    } catch { }

    if (timerNeed.checked) {
        if (timerSeconds === "") {
            timerSeconds = 0;
        } else if (timerMinutes === "") {
            timerMinutes = 0;
        }


        firebase.database().ref(`school${user.school}/tests/${klass}/test${idTest}`).set({
            subject: subject,
            theme: theme,
            klass: klass,
            idTest: idTest,
            qua_img: quantity_img,
            questions: questions_massiveBIG,
            timer: true,
            timerMinutes: timerMinutes,
            timerSeconds: timerSeconds
        });
    } else {

        firebase.database().ref(`school${user.school}/tests/${klass}/test${idTest}`).set({
            subject: subject,
            theme: theme,
            klass: klass,
            idTest: idTest,
            qua_img: quantity_img,
            questions: questions_massiveBIG,
        });
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Вы успешно создали тест!',
        showConfirmButton: false,
        timer: 2000,
    });

    setTimeout(() => location.reload(), 2000);
}

// func create rest for test EGE
// function createBIGTest() {
// };



function deleteTest(id, klass, subject) {
    firebase.database().ref(`school${user.school}/tests/${klass}/test${id}`).remove();

    let testElem = document.getElementById(`test${id}`);
    testElem.parentNode.removeChild(testElem);

    let algebraCounter = document.getElementById('algebra-counter');
    let mathCounter = document.getElementById('math-counter');
    let englishCounter = document.getElementById('english-counter');
    let biologyCounter = document.getElementById('biology-counter');
    let worldCounter = document.getElementById('world-counter');
    let geographyCounter = document.getElementById('geography-counter');
    let geometryCounter = document.getElementById('geometry-counter');
    let historyCounter = document.getElementById('history-counter');
    let literatureCounter = document.getElementById('literature-counter');
    let physicsCounter = document.getElementById('physics-counter');
    let alchemyCounter = document.getElementById('alchemy-counter');
    let russianCounter = document.getElementById('russian-counter');
    let lsfCounter = document.getElementById('lsf-counter');
    let ssCounter = document.getElementById('ss-counter');
    let peCounter = document.getElementById('pe-counter');
    let techCounter = document.getElementById('tech-counter');
    let itCounter = document.getElementById('it-counter');

    switch (subject) {
        case 'Алгебра':
            algebra_counter--;
            algebraCounter.innerHTML = algebra_counter;
            break;
        case 'Математика':
            math_counter--;
            mathCounter.innerHTML = math_counter;
            break;
        case 'Английский язык':
            english_counter--;
            englishCounter.innerHTML = english_counter;
            break;
        case 'Биология':
            biology_counter--;
            biologyCounter.innerHTML = biology_counter;
            break;
        case 'Окружающий мир':
            world_counter--;
            worldCounter.innerHTML = world_counter;
            break;
        case 'География':
            geography_counter--;
            geographyCounter.innerHTML = geography_counter;
            break;
        case 'Геометрия':
            geometry_counter--;
            geometryCounter.innerHTML = geometry_counter;
            break;
        case 'Информатика':
            it_counter--;
            itCounter.innerHTML = it_counter;
            break;
        case 'История':
            history_counter--;
            historyCounter.innerHTML = history_counter;
            break;
        case 'Литература':
            literature_counter--;
            literatureCounter.innerHTML = literature_counter;
            break;
        case 'ОБЖ':
            lsf_counter--;
            lsfCounter.innerHTML = lsf_counter;
            break;
        case 'Обществознание':
            ss_counter--;
            ssCounter.innerHTML = ss_counter;
            break;
        case 'Русский язык':
            russian_counter--;
            russianCounter.innerHTML = russian_counter;
            break;
        case 'Физика':
            physics_counter--;
            physicsCounter.innerHTML = physics_counter;
            break;
        case 'Физкультура':
            pe_counter--;
            peCounter.innerHTML = pe_counter;
            break;
        case 'Химия':
            alchemy_counter--;
            alchemyCounter.innerHTML = alchemy_counter;
            break;
        case 'Технология':
            tech_counter--;
            techCounter.innerHTML = tech_counter;
            break;
    }
}

function deleteResult(idTest) {
    Swal.fire({
        title: 'Предупреждение!',
        icon: 'warning',
        text: 'Если вы удалите результат - ученик сможет пройти тест еще раз!',
        showCancelButton: true,
        cancelButtonText: 'Отмена',
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.isConfirmed) {
                firebase.database().ref(`school${user.school}/tests/${user.myClass}/test${idTest}/results`).remove();
                document.getElementById(`resultTest${idTest}`).innerHTML = '';
            }
        }
    });
}

