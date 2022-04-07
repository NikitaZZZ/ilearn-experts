// check user from mobile or not
const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

// date
const date = new Date();

// window onload
onload = () => {
    // get user from localStorage
    localStorage.setItem('user', JSON.stringify({ 
        who: "teacher",
        fullName: 'Эксперт',
        myClass: '10А',
        school: '192',
        code: 'jiik4fi64vb7g7GY9euRcIYoDvY2'
    }));

    let user = JSON.parse(localStorage.getItem('user'));

    firebase.auth().signInWithEmailAndPassword('expert@gmail.com', 'expert123');

    ILVue.logIn = true;
    ILVue.currentUser = 'teacher';
    document.querySelector('.main-app-teacher').style.display = 'block';
    document.getElementById('myClassTitle').innerHTML += user.myClass;
    startTeacherApp();
    getToDoList();
    innerNews();
    chatWithStudents();
}

// teacher component
Vue.component('teacher-app', {
    template: `
        <div class="container mt-3 main-app-teacher" style="display: none;">
            <div class="row">
                <div class="col-sm mt-3" id="profile">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title" id="profile-name"></h4>
                            <p class="card-subtitle mb-2 text-muted" id="profile-who">Учитель</p>
                            <a data-bs-toggle="offcanvas" data-bs-target="#myClass" title="Мой класс" class="card-link" id="profile-class"></a>
                            <a data-bs-toggle="offcanvas" data-bs-target="#mySchool" title="Моя школа" class="card-link" id="profile-school"></a>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline-danger" onclick="signOutTeacher()">
                                Выйти из профиля
                                <i class="fas fa-sign-out-alt" id="signOut"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm mt-3" id="news">
                    <form>
                        <div class="input-group mb-2">
                            <input type="text" class="form-control" id="name-news" placeholder="Имя новости">
                            <button type="button" class="btn btn-outline-success" id="btn-create-news" data-bs-toggle="collapse" data-bs-target="#createNewNews">Далее</button>
                        </div>
                        <div class="collapse" id="createNewNews">
                            <form>
                                <div class="row mb-3">
                                    <label for="text-news" class="col-sm-2 col-form-label">Текст</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" id="text-news"></textarea>
                                    </div>
                                </div>
                                <fieldset class="row mb-3">
                                    <legend class="col-form-label col-sm-2 pt-0">Показ</legend>
                                    <div class="col-sm-10">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="showNewsForAll" value="option1" checked>
                                            <label class="form-check-label" for="showNewsForAll">
                                                Для всех
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="gridRadios" id="showNewsForClass" value="option2">
                                            <label class="form-check-label" for="showNewsForClass">
                                                Только для моего класса
                                            </label>
                                        </div>
                                        <div class="form-check">
                                        <input class="form-check-input" type="radio" name="gridRadios" id="showNewsForNotClass" value="option3">
                                            <div class="input-group">
                                                <label class="form-check-label" for="showNewsForNotClass">
                                                    Другому классу
                                                </label>

                                                <div class="form-check row mb-3" id="form-div-select-cllet">
                                                    <select class="form-select" aria-label="Default select example" id="select-class">
                                                        <option selected>Выберите класс</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                    </select>
                                                    <select class="form-select" aria-label="Default select example" id="select-letter">
                                                        <option selected>Выберите букву</option>
                                                        <option value="А">А</option>
                                                        <option value="Б">Б</option>
                                                        <option value="В">В</option>
                                                        <option value="Г">Г</option>
                                                        <option value="Д">Д</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="row mb-3">
                                    <div class="col-sm-10 offset-sm-2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="showMyNameNews">
                                            <label class="form-check-label" for="showMyNameNews">
                                                Показывать мое имя
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-success mb-2" onclick="createNews()">Создать</button>
                            </form>
                        </div>
                    </form>
                    <div id="news"></div>
                </div>
                <div class="col-sm mt-3 text-center" id="services">
                    <div class="list-group">
                        <a href="itests.html" target="_blank" style="cursor: pointer;" class="list-group-item list-group-item-action" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/pizap.png" style="border-radius: 20px; width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    ITests
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Создавайте тесты для учеников.</p>
                        </a>
                        <a data-bs-toggle="modal" data-bs-target="#todo" style="cursor: pointer" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/bg.png" style="border-radius: 20px; width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    To Do List
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Создавайте заметки, чтобы не забывать важные вещи.</p>
                        </a>
                        <a data-bs-toggle="modal" data-bs-target="#chat" style="cursor: pointer" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    LAR Chat
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Общайтесь с учениками.</p>
                        </a>
                        <a href="createLesson.html" target="_blank" style="cursor: pointer" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    LAR SchoolWork
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Учить в ILearn - просто.</p>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="modal fade" id="chat" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div id="chatUI">
                            <ol class="list-group" style="padding: 0;" id="chats"></ol>
                        </div>
                    </div>
                </div>
            </div>

            <div id="notifications"></div>

            <div id="pb-students"></div>
            
            <div class="modal fade" id="itests" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div id="main">
                            <div class="nav nav-pills" id="v-pills-tab" role="tablist">
                                <a class="nav-link active" onclick="resultsStudentsList()" id="v-pills-results-students-tab" data-bs-toggle="pill" href="#results_students" role="tab" aria-controls="v-pills-results-students" aria-selected="false">Результаты тестов</a>
                                <a class="nav-link" onclick="tests()" id="v-pills-results-students-tab" data-bs-toggle="pill" href="#tests" role="tab" aria-controls="v-pills-results-students" aria-selected="false">Тесты</a>
                                <a class="nav-link" onclick="createTest()" id="v-pills-tests-tab" data-bs-toggle="pill" href="#createTest" role="tab" aria-controls="v-pills-tests" aria-selected="false">Создать тест</a>
                            </div>
                            <div class="tab-content" id="div_tests">
                                <div class="tab-pane active" id="results_students" role="tabpanel" aria-labelledby="results-students-tab">
                                    <div id="results_students_table"></div>
                                </div>
                                <div class="tab-pane fade" id="tests" role="tabpanel" aria-labelledby="tests-tab">
                                            <div class="accordion" id="accordionExample">
                                                <div class="card">
                                                    <div class="card-header" id="algebraCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#algebra" aria-expanded="true" aria-controls="collapseOne">
                                                                Алгебра <span class="badge bg-primary" id="algebra-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="algebra" class="collapse" aria-labelledby="headingOne">
                                                        <div class="card-body"></div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="mathCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#math" aria-expanded="true" aria-controls="collapseOne">
                                                                Математика <span class="badge bg-primary" id="math-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="math" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="englishCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#english" aria-expanded="true" aria-controls="collapseOne">
                                                                Английский язык <span class="badge bg-primary" id="english-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="english" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="biologyCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#biology" aria-expanded="true" aria-controls="collapseOne">
                                                                Биология <span class="badge bg-primary" id="biology-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="biology" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="okrworldCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#okrworld" aria-expanded="true" aria-controls="collapseOne">
                                                                Окружающий мир <span class="badge bg-primary" id="okrworld-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="okrworld" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="geographyCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#geography" aria-expanded="true" aria-controls="collapseOne">
                                                                География <span class="badge bg-primary" id="geography-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="geography" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="geometryCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#geometry" aria-expanded="true" aria-controls="collapseOne">
                                                                Геометрия <span class="badge bg-primary" id="geometry-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="geometry" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="historyCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#history" aria-expanded="true" aria-controls="collapseOne">
                                                                История <span class="badge bg-primary" id="history-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="history" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="literatureCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#literature" aria-expanded="true" aria-controls="collapseOne">
                                                                Литература <span class="badge bg-primary" id="literature-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="literature" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="physicsCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#physics" aria-expanded="true" aria-controls="collapseOne">
                                                                Физика <span class="badge bg-primary" id="physics-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="physics" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="chemistryCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#alchemy" aria-expanded="true" aria-controls="collapseOne">
                                                                Химия <span class="badge bg-primary" id="alchemy-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="alchemy" class="collapse" aria-labelledby="headingOne"></div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="russianCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#russian" aria-expanded="true" aria-controls="collapseOne">
                                                                Русский язык <span class="badge bg-primary" id="russian-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="russian" class="collapse" aria-labelledby="headingOne"></div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="obzhCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#obzh" aria-expanded="true" aria-controls="collapseOne">
                                                                ОБЖ <span class="badge bg-primary" id="obzh-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="obzh" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="peCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#pe" aria-expanded="true" aria-controls="collapseOne">
                                                                Физическая культура <span class="badge bg-primary" id="pe-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="pe" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="techCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#tech" aria-expanded="true" aria-controls="collapseOne">
                                                                Технология <span class="badge bg-primary" id="tech-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="tech" class="collapse" aria-labelledby="headingOne">
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="socialScienceCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#obsh" aria-expanded="true" aria-controls="collapseOne">
                                                                Обществознание <span class="badge bg-primary" id="obsh-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="obsh" class="collapse" aria-labelledby="headingOne">
                        
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="itCard">
                                                        <h5 class="mb-0">
                                                            <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#it" aria-expanded="true" aria-controls="collapseOne">
                                                                Информатика <span class="badge bg-primary" id="it-counter">0</span>
                                                            </button>
                                                        </h5>
                                                    </div>
                                                
                                                    <div id="it" class="collapse" aria-labelledby="headingOne"></div>
                                                </div>
                                            </div>
                                        </div>
                                <div class="tab-pane fade" id="createTest" role="tabpanel">
                                            <div class="container-fluid" id="create_test">
                                                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                   <li class="nav-item">
                                                        <button class="btn btn-outline-primary" id="plus-question-icon" data-bs-toggle="collapse" data-bs-target="#pills-plus" style="float: left;">Форма создания вопроса</button>
                                                        <button class="btn btn-outline-success" data-bs-toggle="collapse" data-bs-target="#pills-create" id="create-test-admin-btn">Создать тест</button>
                                                   </li>
                                                </ul>
                        
                                                <div class="container-fluid" id="questions"></div>
                                       
                                                <div class="collapse show" id="pills-plus">
                                                    <div class="tab-pane" role="tabpanel" aria-labelledby="pills-plus-tab">
                                                        <div class="form" id="create-question">
                                                            <div class="form-group row">
                                                                <h3>Вопрос</h3>
                                                                <div class="col-sm-10">
                                                                    <input type="text" placeholder="Текст вопроса" class="form-control" id="input_question">
                                                                </div>
                                                            </div>
                                                            <fieldset class="form-group">
                                                                <div class="row mt-3">
                                                                    <legend class="col-form-label col-sm-2 pt-0">Варианты ответа</legend>
                                                                    <div class="col-sm-10">
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="radio" name="gridRadios" id="option_radio1" value="option1">
                                                                            <input type="text" placeholder="Первый вариант ответа" class="form-control" id="inputText1">
                                                                            <br>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" name="gridRadios" id="option_radio2" value="option1">
                                                                        <input type="text" placeholder="Второй вариант ответа" class="form-control" id="inputText2">
                                                                        <br>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" name="gridRadios" id="option_radio3" value="option1">
                                                                        <input type="text" placeholder="Третий вариант ответа" class="form-control" id="inputText3">
                                                                        <br>
                                                                    </div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="radio" name="gridRadios" id="option_radio4" value="option1">
                                                                        <input type="text" placeholder="Четвертый вариант ответа" class="form-control" id="inputText4">
                                                                        <br>
                                                                    </div>
                                                                </div>
                                                                <legend class="col-form-label col-sm-2 pt-0">Изображение: </legend>
                                                                <div class="col-sm-10">
                                                                    <div class="form">
                                                                        <div class="form-group">
                                                                            <input type="file" id="files" />
                                                                            <div class="custom-control custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" id="checkbox_file">
                                                                                <label class="custom-control-label" id="checkbox_file_label" for="checkbox_file">Без изображения</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                            <div class="form-group row">
                                                                <div class="col-sm-10">
                                                                    <button type="submit" class="btn btn-outline-success" onclick="create_question()">Создать вопрос</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="collapse" id="pills-create">
                                                    <div class="tab-pane" role="tabpanel" aria-labelledby="pills-plus-tab">
                                                        <div class="container-fluid">
                                                            <label class="my-1 mr-2 mt-2 d-flex justify-content-center" for="klassGeneralTest">Класс</label>
                                                            <input type="text" placeholder="Класс (Без буквы)" class="form-control w-25 m-auto" id="klassGeneralTest">
                                                    
                                                            <label class="my-1 mr-2 mt-2 d-flex justify-content-center" for="subjectGeneralTest">Предмет</label>
                                                            <div class="w-25" style="margin: 0 auto;">
                                                                <select class="form-select my-1 mr-sm-2" id="subjectGeneralTest">
                                                                    <option>Алгебра</option>
                                                                    <option>Математика</option>
                                                                    <option>Английский язык</option>
                                                                    <option>Биология</option>
                                                                    <option>Окружающий мир</option>
                                                                    <option>География</option>
                                                                    <option>Геометрия</option>
                                                                    <option>История</option>
                                                                    <option>Литература</option>
                                                                    <option>Физика</option>
                                                                    <option>Химия</option>
                                                                    <option>Русский язык</option>
                                                                    <option>ОБЖ</option>
                                                                    <option>Физическая культура</option>
                                                                    <option>Технология</option>
                                                                    <option>Обществознание</option>
                                                                    <option>Информатика</option>
                                                                </select>
                                                            </div>
                                                            <label for="themeGeneralTest" class="my-1 mr-2 mt-2 d-flex justify-content-center">Тема</label>
                                                            <input type="text" placeholder="Тема вопроса" class="form-control w-25 m-auto" id="themeGeneralTest">
                        
                                                            <div class="d-flex justify-content-center mt-3">
                                                                <button class="btn btn-outline-success" onclick="createGeneralTest()">Создать</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="myClass" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="myClassTitle">Мой класс: </h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
                </div>
                <div class="offcanvas-body">
                    <small class="offcanvas-text text-muted">Показаны только зарегистрированные ученики</small>

                    <ol class="list-group list-group-numbered" id="myClassList"></ol>
                    <button class="btn btn-primary mt-2" onclick="nextClassTeacher()">Следующий год</button>
                </div>
            </div>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="mySchool" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="mySchoolTitle">Мой школа: </h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
                </div>
                <div class="offcanvas-body">
                    <small class="offcanvas-text text-muted">Показаны только зарегистрированные ученики</small>
                    <div class="input-group">
                        <input type="text" class="form-control mb-3" oninput="searchStudent()" placeholder="Найти ученика" id="searchStudent">
                        <button class="btn btn-primary mb-3" onclick="findStudent()"><i class="fas fa-microphone"></i></button>
                    </div>

                    <ol class="list-group list-group-numbered" id="studentsSchoolList"></ol>
                </div>
            </div>
        </div>
    `,
});

// student transfer to the next year 
function nextClassTeacher() {
    let currentClass = parseInt(user.myClass);
    const nextClassWithWord = `${currentClass += 1}${user.myClass.replace(/[0-9]/g, '')}`;

    Swal.fire({
        icon: 'warning',
        title: 'Внимание!',
        text: 'Эта функция переводит ваш аккаунт на след. класс. Ученикам нужно будет регистрироваться заново',
        showDenyButton: true,
        denyButtonText: 'Отмена'
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/teacherClass`).set(nextClassWithWord);
            signOutTeacher();
        }
    });
}

// find a student by voice
function findStudent() {
    recognition.start();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'Скажите имя ученика'
    });


    recognition.onresult = (event) => {
        let userText = deletePointFromStr(event.results[0][0].transcript);

        document.querySelector("#searchStudent").value = userText;
        searchStudent();
    }
}

function deletePointFromStr(text) {
    return text[text.length - 1] == '.' ? text.substring(0, text.length - 1) : text
}

// find a student by text
function searchStudent() {
    let parentStudentsList = document.querySelector("#studentsSchoolList");
    let studentsList = parentStudentsList.querySelectorAll(":scope > li");
    let inputSearch = document.querySelector("#searchStudent").value;

    for (let i = 0; i < studentsList.length; i++) {
        let studentName = studentsList[i].innerText;

        if (studentName.trim().toLowerCase().indexOf(inputSearch.trim().toLowerCase()) > -1) {
            studentsList[i].style.display = "";
        } else {
            studentsList[i].style.display = "none";
        }
    }
}

// student component
Vue.component('student-app', {
    template: `
        <div class="container mt-3 main-app-student" style="display: none;">
            <div class="row">
                <div class="col-sm mt-3" id="profile">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title" id="profile-name-student"></h4>
                            <p class="card-subtitle mb-2 text-muted" id="profile-who">Ученик</p>
                            <a class="card-link" id="profile-class-student"></a>
                            <a class="text-muted" id="profile-school-student"></a>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline-danger" onclick="signOutStudent()">
                                Выйти из профиля
                                <i class="fas fa-sign-out-alt" id="signOut"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm mt-3">
                    <div id="news"></div>
                </div>
                <div class="col-sm mt-3 text-center" id="services">
                    <div class="list-group">
                        <a href="tests.html" target="_blank" class="list-group-item list-group-item-action" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/pizap.png" style="border-radius: 20px; width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    ITests
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Проходите тесты от ваших учителей.</p>
                        </a>
                        <a data-bs-toggle="modal" data-bs-target="#chat" style="cursor: pointer" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    LAR Chat
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Общайтесь с учителем или с вашими одноклассниками.</p>
                        </a>
                        <a href="lessons.html" style="cursor: pointer" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">
                                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                                    LAR Schoolwork
                                </h5>
                                <small class="text-muted">Открыть</small>
                            </div>
                            <p class="mb-1">Учиться с ILearn - просто.</p>
                        </a>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="chat" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div id="chatUI">
                            <ol class="list-group" style="padding: 0;" id="chats"></ol>
                        </div>
                    </div>
                </div>
            </div>
            <div id="notifications"></div>
        </div>
    `
});

// task component
Vue.component('task', {
    props: ['data'],
    data() {
        return {}
    },

    methods: {
        task_done() {
            this.$emit('task_done')
        }
    },

    template: `
        <div class="card text-dark mb-3">
            <div class="card-body">
                <h5 class="card-text">{{ data.name }}</h5>
    
                <button class="btn btn-outline-danger" style="cursor: pointer; float: right;" @click="task_done()"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `
});

// vue start
let ILVue = new Vue({
    el: '#app',

    data: {
        // Содержание объекта в массиве
        new_task: {
            name: '',
            id: '',
        },

        // Для поиска таска в массиве
        currentTask: 0,

        // Массивы To Do
        tasks: [],
    },

    methods: {
        signUpTeacher: function () { 
            Swal.fire({
                title: 'Регистрация аккаунта',
                html: `
                    <input type="email" id="emailTeacherSignUp" class="swal2-input" placeholder="Email">
                    <input type="password" id="passwordTeacherSignUp" class="swal2-input" placeholder="Пароль">
                    <input type="text" id="fullNameTeacherSignUp" class="swal2-input" placeholder="Имя и фамилия">
                    <input type="text" id="schoolTeacherSignUp" class="swal2-input" placeholder="Школа">
                    <input type="text" id="yourClassTeacherSignUp" class="swal2-input" placeholder="Ваш класс">
                `,
                confirmButtonText: 'Далее',
                showDenyButton: true,
                denyButtonText: 'Войти',
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#emailTeacherSignUp').value
                    const password = Swal.getPopup().querySelector('#passwordTeacherSignUp').value
                    const fullName = Swal.getPopup().querySelector('#fullNameTeacherSignUp').value
                    const school = Swal.getPopup().querySelector('#schoolTeacherSignUp').value
                    const yourClass = Swal.getPopup().querySelector('#yourClassTeacherSignUp').value

                    if (!fullName || !school || !yourClass || !email || !password) {
                        Swal.showValidationMessage(`Введите имя и фамилию!`)
                    } return { email: email, password: password, fullName: fullName, school: school, yourClass: yourClass }
                }
            }).then((result) => {
                if (result.isDenied) {
                    this.signInTeacher();
                } else {
                    firebase.auth().createUserWithEmailAndPassword(result.value.email, result.value.password).then((userCredential) => {
                        firebase.database().ref(`school${result.value.school}/teachers/teacher${userCredential.user.uid}`).set({
                            fullName: result.value.fullName,
                            school: result.value.school,
                            teacherClass: result.value.yourClass,
                            id: userCredential.user.uid,
                            isOnline: true,
                        });
    
                        localStorage.setItem('user', JSON.stringify({
                            who: 'teacher',
                            fullName: result.value.fullName,
                            school: result.value.school,
                            myClass: result.value.yourClass,
                            code: userCredential.user.uid,
                        }));
    
                        ILVue.logIn = true;
                        ILVue.currentUser = 'teacher';
                        document.querySelector('.main-app-teacher').style.display = 'block';
                        
                        document.getElementById('myClassTitle').innerHTML += result.value.yourClass;
    
                        setTimeout(() => location.reload(), 2000)
                    }).catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            text: 'Ошибка создания аккаунта. Возможно аккаунт с таким Email уже существует!',
                        })    
                    });
                }
            });
        },

        signInTeacher: function () {
            Swal.fire({
                title: 'Вход в аккаунт',
                html: `
                    <input type="email" id="emailTeacherSignIn" class="swal2-input" placeholder="Email">
                    <input type="password" id="passwordTeacherSignIn" class="swal2-input" placeholder="Пароль">
                    <input type="text" id="fullNameTeacherSignIn" class="swal2-input" placeholder="Имя и Фамилия">
                    <input type="text" id="schoolTeacherSignIn" class="swal2-input" placeholder="Школа">
                    <input type="text" id="klassTeacherSignIn" class="swal2-input" placeholder="Ваш класс">`,
                confirmButtonText: 'Войти',
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#emailTeacherSignIn').value
                    const password = Swal.getPopup().querySelector('#passwordTeacherSignIn').value
                    const fullName = Swal.getPopup().querySelector('#fullNameTeacherSignIn').value
                    const school = Swal.getPopup().querySelector('#schoolTeacherSignIn').value
                    const klass = Swal.getPopup().querySelector('#klassTeacherSignIn').value

                    if (!school || !fullName || !klass || !email || !password) {
                        Swal.showValidationMessage(`Пожалуйста, заполните все поля`)
                    } return { fullName: fullName, school: school, myClass: klass, email: email, password: password }
                }
            }).then((result) => {
                firebase.auth().signInWithEmailAndPassword(result.value.email, result.value.password).then((userCredential) => {
                    firebase.database().ref(`school${result.value.school}/teachers/teacher${userCredential.user.uid}`).get().then((snapshot) => {
                        if (snapshot.val() == null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Ошибка входа в аккаунт!',
                                text: 'Проверьте введенные данные!',
                                showDenyButton: true,
                                denyButtonText: 'Зарегистрироваться',
                                focusConfirm: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }).then((result) => {
                                if (result.isDenied) {
                                    this.signUpTeacher();
                                } else {
                                    this.signInTeacher();
                                }
                            });
                        } else {
                            localStorage.setItem('user', JSON.stringify({
                                who: 'teacher',
                                fullName: result.value.fullName,
                                myClass: result.value.myClass,
                                school: result.value.school,
                                code: userCredential.user.uid,
                            }));
    
                            ILVue.logIn = true;
                            ILVue.currentUser = 'teacher';
                            document.querySelector('.main-app-teacher').style.display = 'block';
    
                            document.getElementById('myClassTitle').innerHTML += result.value.myClass;
    
                            setTimeout(() => location.reload(), 2000)
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.signInTeacher();
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ошибка входа в аккаунт!',
                        text: 'Проверьте введенные email и пароль!',
                        showDenyButton: true,
                        denyButtonText: 'Зарегистрироваться',
                        focusConfirm: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isDenied) {
                            this.signUpTeacher();
                        } else {
                            this.signInTeacher();
                        }
                    });
                });
            });
        },

        signUpStudent: function () {
            Swal.fire({
                title: 'Регистрация аккаунта',
                html: `
                    <input type="email" id="emailSignUpStudent" class="swal2-input" placeholder="Email">
                    <input type="password" id="passwordSignUpStudent" class="swal2-input" placeholder="Пароль">
                    <input type="text" id="fullNameSignUpStudent" class="swal2-input" placeholder="Имя и Фамилия">
                    <input type="text" id="schoolSignUpStudent" class="swal2-input" placeholder="Школа">
                    <input type="text" id="klassSignUpStudent" class="swal2-input" placeholder="Класс (С буквой)">`,
                confirmButtonText: 'Далее',
                showDenyButton: true,
                denyButtonText: 'Войти',
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#emailSignUpStudent').value
                    const password = Swal.getPopup().querySelector('#passwordSignUpStudent').value
                    const fullName = Swal.getPopup().querySelector('#fullNameSignUpStudent').value
                    const school = Swal.getPopup().querySelector('#schoolSignUpStudent').value
                    const klass = Swal.getPopup().querySelector('#klassSignUpStudent').value
                    if (!fullName || !school || !klass || !email || !password) {
                        Swal.showValidationMessage(`Заполните все поля`)
                    } return { email: email, password: password, fullName: fullName, school: school, klass: klass }
                }
            }).then((result) => {
                if (result.isDenied) {
                    this.signInStudent();
                } else {
                    firebase.auth().createUserWithEmailAndPassword(result.value.email, result.value.password).then((userCredential) => {
                        firebase.database().ref(`school${result.value.school}/students/student${result.value.fullName.toLowerCase().trim()} ${result.value.klass.toLowerCase().trim()}`).set({
                            fullName: result.value.fullName,
                            school: result.value.school,
                            klass: result.value.klass,
                            id: userCredential.user.uid,
                            isOnline: true,
                        });
    
                        localStorage.setItem('user', JSON.stringify({
                            who: 'student',
                            fullName: result.value.fullName,
                            school: result.value.school,
                            klass: result.value.klass,
                            isOnline: true,
                        }));
    
                        ILVue.logIn = true;
                        ILVue.currentUser = 'student';
                        document.querySelector('.main-app-student').style.display = 'block';
                        
                        setTimeout(() => location.reload(), 2000);
                    }).catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            text: 'Ошибка создания аккаунта. Возможно аккаунт с таким Email уже существует!',
                        })
                    })
                }
            });
        },

        signInStudent: function () {
            Swal.fire({
                title: 'Вход в аккаунт',
                html: `
                    <input type="email" id="emailSignInStudent" class="swal2-input" placeholder="Email">
                    <input type="password" id="passwordSignInStudent" class="swal2-input" placeholder="Пароль">
                    <input type="text" id="fullNameSignInStudent" class="swal2-input" placeholder="Имя и Фамилия">
                    <input type="text" id="schoolSignInStudent" class="swal2-input" placeholder="Школа">
                    <input type="text" id="klassSignInStudent" class="swal2-input" placeholder="Класс (С буквой)">`,
                confirmButtonText: 'Далее',
                showDenyButton: true,
                denyButtonText: 'Зарегистрироваться',
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#emailSignInStudent').value
                    const password = Swal.getPopup().querySelector('#passwordSignInStudent').value
                    const fullName = Swal.getPopup().querySelector('#fullNameSignInStudent').value
                    const school = Swal.getPopup().querySelector('#schoolSignInStudent').value
                    const klass = Swal.getPopup().querySelector('#klassSignInStudent').value
                    if (!fullName || !school || !klass || !email || !password) {
                        Swal.showValidationMessage(`Заполните все поля`)
                    } return { fullName: fullName, school: school, klass: klass, email: email, password: password }
                }
            }).then((result) => {
                if (result.isDenied) {
                    this.signUpStudent();
                } else {
                    firebase.auth().signInWithEmailAndPassword(result.value.email, result.value.password).then(() => {
                        firebase.database().ref(`school${result.value.school}/students/student${result.value.fullName.toLowerCase().trim()} ${result.value.klass.toLowerCase().trim()}`).get().then((snapshot) => {
                            if (snapshot.val() == null) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ошибка входа в аккаунт!',
                                    text: 'Проверьте введенные данные!',
                                    showDenyButton: true,
                                    denyButtonText: 'Зарегистрироваться',
                                    focusConfirm: false,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                }).then((result) => {
                                    if (result.isDenied) {
                                        this.signUpStudent();
                                    } else {
                                        this.signInStudent();
                                    }
                                });
                            } else {
                                localStorage.setItem('user', JSON.stringify({
                                    who: 'student',
                                    fullName: result.value.fullName,
                                    school: result.value.school,
                                    klass: result.value.klass,
                                }));
    
                                firebase.database().ref(`school${result.value.school}/students/student${result.value.fullName.toLowerCase().trim()} ${result.value.klass.toLowerCase().trim()}/isOnline`).set(true);
                                ILVue.logIn = true;
                                ILVue.currentUser = 'student';
                                document.querySelector('.main-app-student').style.display = 'block';
                                
                                setTimeout(() => location.reload(), 2000)
                            }
                        });
                    }).catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Ошибка входа в аккаунт!',
                            text: 'Проверьте введенные Email и пароль!',
                            showDenyButton: true,
                            denyButtonText: 'Зарегистрироваться',
                            focusConfirm: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            if (result.isDenied) {
                                this.signUpStudent();
                            } else {
                                this.signInStudent();
                            }
                        });
                    })
                }
            });
        },

        // Добавить задание
        add_task() {
            if (this.new_task.name === '') {
                Swal.fire({
                    title: "Заполни все поля!",
                    icon: "error"
                })
            } else {
                const idTask = getRandId();

                this.tasks.push({
                    name: this.new_task.name,
                    id: idTask,
                });

                add_task_db(this.currentTask);
                this.currentTask += 1;

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Таск создан!'
                });
            }
        },

        // Удалить задание
        delete_task(id_task) {
            let user = JSON.parse(localStorage.getItem('user'));

            const index = this.tasks.findIndex(item => item.id === id_task);
            this.tasks.splice(index, 1);

            firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/tasks/task${id_task}`).remove();
        },
    }
});

// teacher app
function startTeacherApp() {
    const user = JSON.parse(localStorage.getItem('user'));

    window.onblur = () => {
        firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/isOnline`).set(false);
    }

    window.onfocus = () => {
        firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/isOnline`).set(true);
    }

    // let pb_images = []
    let pb_find_imgs = ['pcpcpd', 'gias', 'afa', 'pcs', 'fm'];

    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}`).get().then((snapshot) => {
        const fullName = snapshot.val().fullName;
        const school = snapshot.val().school;
        const klass = snapshot.val().teacherClass;

        document.getElementById('profile-name').innerHTML = fullName;
        document.getElementById('profile-class').innerHTML = `Мой класс: ${klass}`;
        document.getElementById('profile-school').innerHTML = `/ Школа №${school}`;

        firebase.database().ref(`school${user.school}/students`).on('child_added', (data) => {
            const fullName = data.val().fullName;

            for (let i = 0; i < pb_find_imgs.length; i++) {
                storageRef.child(`pb${school}${klass}/pb-student${snapshot.val().id}/${pb_find_imgs[i]}`).getDownloadURL().then((url) => {
                    document.querySelector(`#${pb_find_imgs[i]}-img`).src = url;
                });
            }

            document.getElementById('pb-students').innerHTML += `
                <div class="modal fade" id="${data.val().id}" tabindex="-1">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <form class="row g-3 mb-3" style="padding: 1rem">
                                <div class="col-md-6" id="pcpcpd">
                                    <label for="pcpcpd-label" class="form-label fw-bold">Согласие родителя на обработку персональных данных ребенка</label>
                                    <img src="" class="pb-img" id="pcpcpd-img" />
                                    <input type="file" class="form-control mt-2" onchange="upload_pb('pcpcpd', 'pcpcpd-file', '${school}', '${klass}', '${snapshot.val().id}')" id="pcpcpd-file">
                                </div>
                                <div class="col-md-6" id="gias">
                                    <label for="gias-label" class="form-label fw-bold">Общие сведения об учащемся</label>
                                    <img src="" class="pb-img" id="gias-img" />
                                    <input type="file" class="form-control mt-2" onchange="upload_pb('gias', 'gias-file', '${school}', '${klass}', '${snapshot.val().id}')" id="gias-file">
                                </div>
                                <div class="col-md-6" id="afa">
                                    <label for="afa-label" class="form-label fw-bold">Завяление о приеме</label>
                                    <img src="" class="pb-img" id="afa-img" />
                                    <input type="file" class="form-control mt-2" onchange="upload_pb('afa', 'afa-file', '${school}', '${klass}', '${snapshot.val().id}')" id="afa-file">
                                </div>
                                <div class="col-md-6" id="pcs">
                                    <label for="pcs-label" class="form-label fw-bold">Личная карта обучающегося</label>
                                    <img src="" class="pb-img" id="pcs-img" />
                                    <input type="file" class="form-control mt-2" onchange="upload_pb('pcs', 'pcs-file', '${school}', '${klass}', '${snapshot.val().id}')" id="pcs-file">
                                </div>
                                <div class="col-md-6" id="fm">
                                    <label for="fm-label" class="form-label fw-bold">Итоговые оценки</label>
                                    <img src="" class="pb-img" id="fm-img" />
                                    <input type="file" class="form-control mt-2" onchange="upload_pb('fm', 'fm-file', '${school}', '${klass}', '${snapshot.val().id}')" id="fm-file">
                                </div>
                            </form>
                            <div class="modal-header">
                                <button class="btn btn-success" onclick="location.reload()">Обновить</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            if (data.val().klass == user.myClass) {
                document.getElementById('myClassList').innerHTML += `<li class="list-group-item" data-bs-toggle="collapse" data-bs-target="[id='${data.val().id}']">${fullName}</li>`;
                document.getElementById('studentsSchoolList').innerHTML += `<li class="list-group-item" data-bs-toggle="collapse" data-bs-target="[id='${data.val().id}']">${fullName}</li>`;

                document.getElementById('myClassList').innerHTML += `
                    <div class="collapse" id="${data.val().id}">
                        <div class="card card-body">
                            <p>Имя: ${fullName}</p>
                            <p>Класс: ${data.val().klass}</p>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.val().id}">Личное дело</button>
                        </div>
                    </div>
                `;
                document.getElementById('studentsSchoolList').innerHTML += `
                    <div class="collapse" id="${data.val().id}">
                        <div class="card card-body">
                            <p>Имя: ${fullName}</p>
                            <p>Класс: ${data.val().klass}</p>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.val().id}">Личное дело</button>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById('studentsSchoolList').innerHTML += `<li class="list-group-item" data-bs-toggle="collapse" data-bs-target="[id='${data.val().id}']">${fullName}</li>`;
                document.getElementById('studentsSchoolList').innerHTML += `
                    <div class="collapse" id="${data.val().id}">
                        <div class="card card-body">
                            <p>Имя: ${fullName}</p>
                            <p>Класс: ${data.val().klass}</p>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${data.val().id}">Личное дело</button>
                        </div>
                    </div>
                `;
            }
        });

        firebase.database().ref(`school${user.school}/students`)
    });
}

function upload_pb(namePb, imgElem, school, klass, id) {
    let img = document.getElementById(imgElem).files[0];

    storageRef.child(`pb${school}${klass}/pb-student${id}/${namePb}`).put(img).then(() => console.log('success'));
}

// student app
function startStudentApp() {
    let user = JSON.parse(localStorage.getItem('user'));

    window.onblur = () => {
        firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase().trim()} ${user.klass.toLowerCase().trim()}/isOnline`).set(false);
    }

    window.onfocus = () => {
        firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase().trim()} ${user.klass.toLowerCase().trim()}/isOnline`).set(true);
    }

    console.log(`school${user.school}/students/student${user.fullName.toLowerCase().trim()} ${user.klass.toLowerCase().trim()}`)
    firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase().trim()} ${user.klass.toLowerCase().trim()}`).get().then((snapshot) => {
        const fullName = snapshot.val().fullName;
        const school = snapshot.val().school;
        const klass = snapshot.val().klass;
        // const teacherId = snapshot.val().teacherId;

        document.getElementById('profile-name-student').innerHTML = fullName;
        document.getElementById('profile-class-student').innerHTML = `Я учусь в ${klass} классе`;
        document.getElementById('profile-school-student').innerHTML = `/ Школа №${school}`;
    });
}

// inner news
function innerNews() {
    let userClass = '';

    const user = JSON.parse(localStorage.getItem('user'));

    // global news
    firebase.database().ref(`school${user.school}/news/`).on('child_added', (data) => {
        const nameNews = data.val().nameNews;
        const textNews = data.val().textNews;
        const fullName = data.val().fullName;
        const newsId = data.val().newsId;
        const likes = data.val().likes;
        const dislikes = data.val().dislikes;
        const day = data.val().date.day;
        const month = data.val().date.month;
        const year = data.val().date.year;

        if (fullName === undefined) {
            document.getElementById('news').innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                        <h5 class="card-title">${nameNews}</h5>
                        <p class="card-text">${textNews}</p>
                    </div>
                    <div class="collapse" id="comments${newsId}">
                        <div id="innerComments${newsId}"></div>
                        <form>
                            <div class="input-group">
                                <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}')">Написать</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                        <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                        <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('news').innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                        <h5 class="card-title">${nameNews}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                        <p class="card-text">${textNews}</p>
                    </div>
                    <div class="collapse" id="comments${newsId}">
                        <div id="innerComments${newsId}"></div>
                        <form>
                            <div class="input-group">
                                <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}')">Написать</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                        <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                        <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                    </div>
                </div>
            `;
        }

        // comments
        firebase.database().ref(`school${user.school}/news/${newsId}/comments/`).on('child_added', (snapshot) => {
            const fullName = snapshot.val().fullName;
            const comment = snapshot.val().comment;

            const commentsDiv = document.getElementById(`innerComments${newsId}`);
            commentsDiv.innerHTML += `
                <div class="card comment m-auto mb-2">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                        <p class="card-text">${comment}</p>
                    </div>
                </div>
            `;
        });

        switch (user.who) {
            case 'student':
                firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase()} ${userClass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val()

                    if (emotions === 'like') {
                        const likePostElem = document.getElementById(`likePostIcon${newsId}`)

                        likePostElem.className = 'fas fa-heart'
                    } else if (emotions === 'dislike') {
                        const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)

                        dislikePostElem.className = 'fas fa-thumbs-down'
                    }
                })
                ; break;
            case "teacher":
                firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val()

                    if (emotions === 'like') {
                        const likePostElem = document.getElementById(`likePostIcon${newsId}`)

                        likePostElem.className = 'fas fa-heart'
                    } else if (emotions === 'dislike') {
                        const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)

                        dislikePostElem.className = 'fas fa-thumbs-down'
                    }
                })
            ; break;
        }
    });

    try {
        user.myClass.length % 2 == 0 ? 
            userClass = `${user.myClass[0]}${user.myClass = user.myClass[1].toUpperCase()}` : 
            userClass = `${user.myClass[0]}${user.myClass[1]}${user.myClass = user.myClass[2].toUpperCase()}`
    } catch {
        user.klass.length % 2 == 0 ? 
            userClass = `${user.klass[0]}${user.klass = user.klass[1].toUpperCase()}` : 
            userClass = `${user.klass[0]}${user.klass[1]}${user.klass = user.klass[2].toUpperCase()}`
    }

    // news from class
    firebase.database().ref(`school${user.school}/news${userClass}/`).on('child_added', (data) => {
        const nameNews = data.val().nameNews;
        const textNews = data.val().textNews;
        const fullName = data.val().fullName;
        const newsId = data.val().newsId;
        const likes = data.val().likes;
        const dislikes = data.val().dislikes;
        const day = data.val().date.day;
        const month = data.val().date.month;
        const year = data.val().date.year;

        if (fullName === undefined) {
            document.getElementById('news').innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                        <h5 class="card-title">${nameNews}</h5>
                        <p class="card-text">${textNews}</p>
                    </div>
                    <div class="collapse" id="comments${newsId}">
                        <div id="innerComments${newsId}"></div>
                        <form>
                            <div class="input-group">
                                <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}', '${userClass}')">Написать</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}', '${userClass}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                        <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}', '${userClass}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                        <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('news').innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                        <h5 class="card-title">${nameNews}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                        <p class="card-text">${textNews}</p>
                    </div>
                    <div class="collapse" id="comments${newsId}">
                        <div id="innerComments${newsId}"></div>
                        <form>
                            <div class="input-group">
                                <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}', '${userClass}')">Написать</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}', '${userClass}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                        <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}', '${userClass}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                        <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                    </div>
                </div>
            `;
        }

        firebase.database().ref(`school${user.school}/news${userClass}/${newsId}/comments/`).on('child_added', (snapshot) => {
            const fullName = snapshot.val().fullName;
            const comment = snapshot.val().comment;

            const commentsDiv = document.getElementById(`innerComments${newsId}`);
            commentsDiv.innerHTML += `
                <div class="card comment m-auto mb-2">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                        <p class="card-text">${comment}</p>
                    </div>
                </div>
            `;
        });

        switch (user.who) {
            case 'student':
                firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase()} ${userClass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val()

                    if (emotions === 'like') {
                        const likePostElem = document.getElementById(`likePostIcon${newsId}`)

                        likePostElem.className = 'fas fa-heart'
                    } else if (emotions === 'dislike') {
                        const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)

                        dislikePostElem.className = 'fas fa-thumbs-down'
                    }
                })
            ; break;
            case "teacher":
                firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val()

                    if (emotions === 'like') {
                        const likePostElem = document.getElementById(`likePostIcon${newsId}`)

                        likePostElem.className = 'fas fa-heart'
                    } else if (emotions === 'dislike') {
                        const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)

                        dislikePostElem.className = 'fas fa-thumbs-down'
                    }
                })
            ; break;
        }
    });

    // render news from not teacher class, but created from this teacher
    if (user.who == "teacher") {
        firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/newsForNotClass/`).on('child_added', (data) => {
            firebase.database().ref(`school${user.school}/news${data.val().klass}/${data.val().newsId}`).get().then((snapshot) => {
                const nameNews = snapshot.val().nameNews;
                const textNews = snapshot.val().textNews;
                const fullName = snapshot.val().fullName;
                const newsId = snapshot.val().newsId;
                const likes = snapshot.val().likes;
                const dislikes = snapshot.val().dislikes;
                const day = snapshot.val().date.day;
                const month = snapshot.val().date.month;
                const year = snapshot.val().date.year;
                const klassNews = snapshot.val().klassNews;
    
                if (fullName === undefined) {
                    document.getElementById('news').innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                                <h6 class="card-subtitle text-muted" style="float: right; margin-right: 0.5rem;">${data.val().klass}</h6>

                                <h5 class="card-title">${nameNews}</h5>
                                <small>${klassNews}</small>
                                <p class="card-text">${textNews}</p>
                            </div>
                            <div class="collapse" id="comments${newsId}">
                                <div id="innerComments${newsId}"></div>
                                <form>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                        <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}', '${klassNews}')">Написать</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}', '${klassNews}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                                <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}', '${klassNews}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                                <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                            </div>
                        </div>
                    `;
                } else {
                    document.getElementById('news').innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-subtitle text-muted" style="float: right">${day}.${month}.${year}</h6>
                                <h5 class="card-title">${nameNews}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                                <p class="card-text">${textNews}</p>
                            </div>
                            <div class="collapse" id="comments${newsId}">
                                <div id="innerComments${newsId}"></div>
                                <form>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="commentInput${newsId}" placeholder="Комментарий...">
                                        <button class="btn btn-outline-success" type="button" id="btn-comment" onclick="postComment('${newsId}', '${user.fullName}', '${user.school}', '${klassNews}')">Написать</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link likePost" id="likePost${newsId}" onclick="likePost(${newsId}, '${user.school}', '${klassNews}')"><i class="far fa-heart" id="likePostIcon${newsId}"></i> ${likes}</a>
                                <a href="#" class="card-link dislikePost" id="dislikePost${newsId}" onclick="dislikePost(${newsId}, '${user.school}', '${klassNews}')"><i class="far fa-thumbs-down" id="dislikePostIcon${newsId}"></i> ${dislikes}</a>
                                <a data-bs-toggle="collapse" href="#comments${newsId}" class="card-link" id="commentsPost" style="float: right;"><i class="far fa-comments" id="iconComments"></i> Комментарии</a>
                            </div>
                            ${klassNews != undefined ? `<small class="smallNewsForCertainClass text-muted">Новость для: ${klassNews} класса</small>` : ''}
                        </div>
                    `;
                }
    
                firebase.database().ref(`school${user.school}/news${klassNews}/${newsId}/comments/`).on('child_added', (snapshot) => {
                    const fullName = snapshot.val().fullName;
                    const comment = snapshot.val().comment;
    
                    const commentsDiv = document.getElementById(`innerComments${newsId}`);
                    commentsDiv.innerHTML += `
                        <div class="card comment m-auto mb-2">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                                <p class="card-text">${comment}</p>
                            </div>
                        </div>
                    `;
                });

                
                firebase.database().ref(`school${user.school}/news${userClass}/${newsId}/comments/`).on('child_added', (snapshot) => {
                    const fullName = snapshot.val().fullName;
                    const comment = snapshot.val().comment;

                    const commentsDiv = document.getElementById(`innerComments${newsId}`);
                    commentsDiv.innerHTML += `
                        <div class="card comment m-auto mb-2">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">${fullName}</h6>
                                <p class="card-text">${comment}</p>
                            </div>
                        </div>
                    `;
                });
    
                switch (user.who) {
                    case 'student':
                        firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase()} ${userClass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                            let emotions = snapshot.val()
    
                            if (emotions === 'like') {
                                const likePostElem = document.getElementById(`likePostIcon${newsId}`)
    
                                likePostElem.className = 'fas fa-heart'
                            } else if (emotions === 'dislike') {
                                const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)
    
                                dislikePostElem.className = 'fas fa-thumbs-down'
                            }
                        })
                    ; break;
                    case "teacher":
                        firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                            let emotions = snapshot.val()
    
                            if (emotions === 'like') {
                                const likePostElem = document.getElementById(`likePostIcon${newsId}`)
    
                                likePostElem.className = 'fas fa-heart'
                            } else if (emotions === 'dislike') {
                                const dislikePostElem = document.getElementById(`dislikePostIcon${newsId}`)
    
                                dislikePostElem.className = 'fas fa-thumbs-down'
                            }
                        })
                    ; break;
                }
            });
        });
    }
}

// create news
function createNews() {
    const nameNews = document.getElementById('name-news').value;
    const textNews = document.getElementById('text-news').value;

    const showForAll = document.getElementById('showNewsForAll').checked;
    const showForClass = document.getElementById('showNewsForClass').checked;
    const showForNotClass = document.getElementById('showNewsForNotClass').checked;

    const select_class = document.getElementById("select-class");
    const value_notclass = select_class.value;

    const select_letter = document.getElementById("select-letter");
    const value_notletter = select_letter.value;

    const showMyName = document.getElementById('showMyNameNews').checked;

    const user = JSON.parse(localStorage.getItem('user'));

    if (!nameNews || !textNews) {
        Swal.fire({
            icon: 'error',
            title: 'Заполните все поля!',
        });
    } else {
        const newsId = getRandId();
        console.log(showForClass);

        if (showForNotClass === true && (value_notclass != "Выберете класс" && value_notletter != "Выберете букву") ) {
            value_selectes = value_notclass + value_notletter

            if ((value_notclass == "Выберете класс") || (value_notletter == "Выберете букву")) {
                Swal.fire({
                    icon: 'error',
                    title: 'Заполните все поля!',
                });
            } else if (showMyName === true) {
                    firebase.database().ref(`school${user.school}/news${value_selectes}/${newsId}`).set({
                        nameNews: nameNews,
                        textNews: textNews,
                        fullName: user.fullName,
                        klassNews: value_selectes,
                        newsId: newsId,
                        likes: 0,
                        dislikes: 0,
                        date: {
                            day: date.getDate(),
                            month: date.getMonth() + 1,
                            year: date.getFullYear(),
                        }
                    });

                    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/newsForNotClass/news${newsId}`).set({
                        newsId: newsId,
                        klass: value_selectes
                    });
                } else {
                    firebase.database().ref(`school${user.school}/news${value_selectes}/${newsId}`).set({
                        nameNews: nameNews,
                        textNews: textNews,
                        newsId: newsId,
                        klassNews: value_selectes,
                        likes: 0,
                        dislikes: 0,
                        date: {
                            day: date.getDate(),
                            month: date.getMonth() + 1,
                            year: date.getFullYear(),
                        }
                    });

                    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/newsForNotClass/news${newsId}`).set({
                        newsId: newsId,
                        klass: value_selectes
                    });
                }
        } else if (showForAll === true) {
            if (showMyName === true) {
                firebase.database().ref(`school${user.school}/news/${newsId}`).set({
                    nameNews: nameNews,
                    textNews: textNews,
                    fullName: user.fullName,
                    newsId: newsId,
                    likes: 0,
                    dislikes: 0,
                    date: {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear(),
                    }
                });
            } else {
                firebase.database().ref(`school${user.school}/news/${newsId}`).set({
                    nameNews: nameNews,
                    textNews: textNews,
                    newsId: newsId,
                    likes: 0,
                    dislikes: 0,
                    date: {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear(),
                    }
                });
            }
        } else if (showForClass === true) {
            if (showMyName === true) {
                console.log('helllo!');
                firebase.database().ref(`school${user.school}/news${user.myClass}/${newsId}`).set({
                    nameNews: nameNews,
                    textNews: textNews,
                    fullName: user.fullName,
                    newsId: newsId,
                    likes: 0,
                    dislikes: 0,
                    date: {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear(),
                    }
                });
            } else {
                firebase.database().ref(`school${user.school}/news${user.myClass}/${newsId}`).set({
                    nameNews: nameNews,
                    textNews: textNews,
                    newsId: newsId,
                    likes: 0,
                    dislikes: 0,
                    date: {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear(),
                    }
                });
            }
        } 
    }
}

// comment post
function postComment(newsId, fullName, school, klass = '') {
    const commentInput = document.getElementById(`commentInput${newsId}`).value;
    const commentId = getRandId();

    if (commentInput != '') {
        if (klass === '') {
            firebase.database().ref(`school${school}/news/${newsId}/comments/comment${commentId}`).set({
                comment: commentInput,
                fullName: fullName
            });
        } else if (klass !== '') {
            firebase.database().ref(`school${school}/news${klass}/${newsId}/comments/comment${commentId}`).set({
                comment: commentInput,
                fullName: fullName
            });
        }
    }
}

// like post
function likePost(newsId, school, klass = '') {
    const user = JSON.parse(localStorage.getItem('user'));

    switch (user.who) {
        case 'student':
            if (klass === '') {
                firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();

                    if (emotions === 'dislike') {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;

                            dislikes = snapshot.val().dislikes;
                            dislikes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="far fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('like');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('like');
                        });
                    }
                });
            } else if (klass !== '') {
                firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();
                    if (emotions === 'dislike') {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;

                            dislikes = snapshot.val().dislikes;
                            dislikes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="far fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('like');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('like');
                        });
                    }
                });
            }
        ; break;

        case 'teacher':
            if (klass === '') {
                firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();

                    if (emotions === 'dislike') {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;

                            dislikes = snapshot.val().dislikes;
                            dislikes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="far fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('like');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('like');
                        });
                    }
                });
            } else if (klass !== '') {
                firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();
                    if (emotions === 'dislike') {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;

                            dislikes = snapshot.val().dislikes;
                            dislikes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="far fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('like');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            likes = snapshot.val().likes;
                            likes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            likePostElem.innerHTML = `<i class="fas fa-heart"></i> ${likes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('like');
                        });
                    }
                });
            }
        ; break;
    }
}

// dislike post
function dislikePost(newsId, school, klass = '') {
    const user = JSON.parse(localStorage.getItem('user'));

    switch (user.who) {
        case 'student':
            if (klass === '') {
                firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();
                    if (emotions === 'like') {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;

                            likes = snapshot.val().likes;
                            likes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('dislike');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('dislike');
                        });
                    }
                });
            } else if (klass !== '') {
                firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();

                    if (emotions === 'like') {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;

                            likes = snapshot.val().likes;
                            likes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('dislike');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/students/student${user.fullName.toLowerCase()} ${user.klass.toLowerCase()}/likes/emotions${newsId}/`).set('dislike');
                        });
                    }
                });
            }
        ; break;
        case 'teacher':
            if (klass === '') {
                firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();
                    if (emotions === 'like') {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;

                            likes = snapshot.val().likes;
                            likes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('dislike');
                        });
                    } else if (emotions === null) {
                        firebase.database().ref(`school${school}/news/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news/${newsId}/dislikes`).set(dislikes);

                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('dislike');
                        });
                    }
                });
            } else if (klass !== '') {
                firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}/`).get().then((snapshot) => {
                    let emotions = snapshot.val();

                    if (emotions === 'like') {
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;

                            likes = snapshot.val().likes;
                            likes--;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/likes`).set(likes);
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const likePostElem = document.getElementById(`likePost${newsId}`)
                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)

                            likePostElem.innerHTML = `<i class="far fa-heart"></i> ${likes}`;
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('dislike');
                        });
                    } else if (emotions === null) {
                        console.log(`school${school}/news${klass}/${newsId}`);
                        firebase.database().ref(`school${school}/news${klass}/${newsId}`).get().then((snapshot) => {
                            dislikes = snapshot.val().dislikes;
                            dislikes++;
                        }).then(() => {
                            firebase.database().ref(`school${school}/news${klass}/${newsId}/dislikes`).set(dislikes);

                            const dislikePostElem = document.getElementById(`dislikePost${newsId}`)
                            dislikePostElem.innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;

                            firebase.database().ref(`school${school}/teachers/teacher${user.code}/likes/emotions${newsId}`).set('dislike');
                        });
                    }
                });
            }
        ; break;
    }
}

// sign out teacher
function signOutTeacher() {
    const user = JSON.parse(localStorage.getItem('user'));

    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/isOnline`).set(false);
    localStorage.removeItem('user');
    document.querySelector('.main-app-teacher').style.display = 'none';
    ILVue.logIn = false;
    ILVue.currentUser = '';

    location.reload();
}

// sign out student
function signOutStudent() {
    const user = JSON.parse(localStorage.getItem('user'));

    firebase.database().ref(`school${user.school}/students/student${user.fullName.toLowerCase().trim()} ${user.klass.toLowerCase().trim()}/isOnline`).set(false);
    localStorage.removeItem('user');
    document.querySelector('.main-app-student').style.display = 'none';
    ILVue.logIn = false;
    ILVue.currentUser = '';

    location.reload();
}

// add task to database
function add_task_db(index) {
    const user = JSON.parse(localStorage.getItem('user'));

    let nameElem = document.getElementById("name-task").value;
    let id = ILVue.$data.tasks[index].id;

    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/tasks/task${id}`).set({
        name: nameElem,
        id: id,
    });
}

function getToDoList() {
    // user
    let user = JSON.parse(localStorage.getItem('user'));

    // to do list
    firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/tasks/`).get().then((snapshot) => {
        for (let key in snapshot.val()) {
            firebase.database().ref(`school${user.school}/teachers/teacher${user.code}/tasks/${key}`).get().then((snapshot) => {
                let nameTask = snapshot.val().name;
                let idTask = snapshot.val().id;

                ILVue.$data.tasks.push({
                    name: nameTask,
                    id: idTask,
                });
            });
        }
    });
}