// Получение из localStorage имени и фамилии
const user = JSON.parse(localStorage.getItem('user'));

// Div для вставки тестов
let testsInner = document.getElementById("tests-inner");

// Переменная для нумерации вопросов
number_test = 0;

// Переменная для изображений
let image_number = -1;

// Для вопросов
let question_number = -1;

// Результаты теста
let results_test = [];

// Таймер
let timerMassive = [];

let testsNeed = 0;

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}

const klass = removeSpaces(user.klass);

// Скрывать пройденные тесты
firebase.database().ref(`school${user.school}/tests/${klass}`).on('value', (snapshot) => {
  for (let key in snapshot.val()) {
    firebase.database().ref(`school${user.school}/tests/${klass}/${key}/results`).on('child_added', (data) => {
      let testAcc = document.getElementById(`testAcc${data.val().idTest}`);
      testAcc.parentNode.removeChild(testAcc);
    });
  }
});

// Вывод тестов
firebase.database().ref(`school${user.school}/tests/${klass}`).on('child_added', (snapshot) => {
  const id_db = snapshot.val().idTest;
  const questions_db = snapshot.val().questions;
  const subject_db = snapshot.val().subject;
  const theme_db = snapshot.val().theme;
  const qua_img_db = snapshot.val().qua_img;

  question_number = -1;
  image_number += 1;

  testsNeed += 1;

  testsInner.innerHTML += `
    <div class="accordion" id="testAcc${id_db}">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" onclick="checkTimer(${id_db})" aria-expanded="true" aria-controls="collapseOne">
                      ${subject_db} - ${theme_db} <div id="timerDiv${id_db}"></div>
                  </button>
  
                  <button class="btn btn-outline-success mt-0" style="float: right;" onclick="send_test(${id_db}, ${questions_db.length}); stopTimer(${id_db});" id="send-test${id_db}">
                      <i class="fas fa-check"></i>
                      Закончить
                  </button>
                </h5>
            </div>
            
            <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                    <div class="swiper">
                        <div class="swiper-wrapper" id="collapsesQuestionsimg${id_db}">
                        </div>

                        <!-- If we need pagination -->
                        <div class="swiper-pagination"></div>

                        <!-- If we need navigation buttons -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>

                    </div>
                    <div id="test${id_db}"></div>
                </div>
            </div>
        </div>
    </div>
  `;

  try {
    timerNeed = doc.data().timer;
    timerMassive.push({
      test: id_db,
      timerNeed: timerNeed,
    });

    if (timerNeed === true) {
      timerMinutes = doc.data().timerMinutes;
      timerSeconds = doc.data().timerSeconds;

      if (timerMinutes === '') {
        if (timerSeconds.length === 1) {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: 00:0${timerSeconds}`;
        } else {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: 00:${timerSeconds}`;
        }
      } else if (timerSeconds === '') {
        if (timerSeconds.length === 1) {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:00`;
        } else {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:00`;
        }
      } else {
        if (timerSeconds.length === 1) {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:0${timerSeconds}`;
        } else {
          const timerDiv = document.getElementById(`timerDiv${id_db}`);
          timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:${timerSeconds}`;
        }
      }
    } else { }
  } catch { }



  // Cycle output imf for BIG test
  for (let i = 0; i < qua_img_db; i++) {
    if (theme_db == ("ЕГЭ" || "ОГЭ" || "ВПР")) {
      document.getElementById(`collapsesQuestionsimg${id_db}`).innerHTML += `
            <img class="swiper-slide" alt="imageTest" id="image-test${id_db}${i}"/>
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


  let question = document.getElementById(`test${id_db}`);

  for (let i = 0; i < questions_db.length; i++) {
    question_number += 1;
    const current_question_number = question_number;

    if (questions_db[question_number].option_1 != null) {
      question.innerHTML += `
        <p class="lead" id="question">${questions_db[question_number].input_question}</p>
          
        <img alt="imageTest" class="img-fluid" width="400" height="400" id="image-test${question_number}">
          
        <div class="form-check mt-1" id="option1_div">
            <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option1${question_number}${id_db}">
            <label class="form-check-label" for="option1${question_number}${id_db}">${questions_db[question_number].option_1}</label>
        </div>
        <div class="form-check" id="option2_div">
            <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option2${question_number}${id_db}">
            <label class="form-check-label" for="option2${question_number}${id_db}">${questions_db[question_number].option_2}</label>
        </div>
        <div class="form-check" id="option3_div">
            <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option3${question_number}${id_db}">
            <label class="form-check-label" for="option3${question_number}${id_db}">${questions_db[question_number].option_3}</label>
        </div>
        <div class="form-check" id="option4_div">
            <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option4${question_number}${id_db}">
            <label class="form-check-label" for="option4${question_number}${id_db}">${questions_db[question_number].option_4}</label>
        </div>

        <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number}', '${questions_db[question_number].correct_answer}');" style="border-radius: 0">
              <i class="fas fa-check"></i>
                Ответить
            </button>
        </div>
      `;
    } else if (theme_db != ("ЕГЭ" || "ОГЭ" || "ВПР")) {
      question.innerHTML += `
        <p class="lead" id="question">${questions_db[question_number].input_question}</p>
          
        <img alt="imageTest" class="img-fluid" width="400" height="400" id="image-test${question_number}">
          
        <div class="form-check" id="input_answer_div">
          <label class="form-check-label" for="option${question_number}${id_db}">Ответ</label>
          <input class="form-control" name="input-answer${question_number}${id_db}" type="text" style="max-width: 350px;" id="input-answer${question_number}${id_db}">
        </div>

        <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number}', '${questions_db[question_number].correct_answer}');" style="border-radius: 0">
              <i class="fas fa-check"></i>
                Ответить
            </button>
        </div>
      `;
    } else if (theme_db == ("ЕГЭ" || "ОГЭ" || "ВПР")) {
      question.innerHTML += `
        <p class="lead" id="question">${questions_db[question_number].input_question}</p>
          
        <div class="form-check" id="input_answer_div">
          <label class="form-check-label" for="option${question_number}${id_db}">Ответ</label>
          <input class="form-control" name="input-answer${question_number}${id_db}" type="text" style="max-width: 350px;" id="input-answer${question_number}${id_db}">
        </div>

        <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number}', '${questions_db[question_number].correct_answer}');" style="border-radius: 0">
              <i class="fas fa-check"></i>
                Ответить
            </button>
        </div>
      `;
    }

    //  Loading img for BIG test for EGE
    for (let i = 0; i < qua_img_db; i++) {
      let imageBIG = firebase.storage().ref(`/test${id_db}/question${i}`);
      if (theme_db == ("ЕГЭ" || "ОГЭ" || "ВПР")) {

        imageBIG.getDownloadURL().then((url) => {
          let image_test = document.getElementById(`image-test${id_db}${i}`);
          image_test.src = url;
        }).catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              let image_test_onf = document.getElementById(`image-test${id_db}`);
              image_test_onf.parentNode.removeChild(image_test_onf);
              break;

            case 'storage/unauthorized':
              let image_test_uaz = document.getElementById(`image-test${id_db}`);
              image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
            case 'storage/canceled':
              let image_test_ccd = document.getElementById(`image-test${id_db}`);
              image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
            case 'storage/unknown':
              let image_test_unk = document.getElementById(`image-test${id_db}`);
              image_test_unk.parentNode.removeChild(image_test_unk);
              break;
          }
        });

      }
    }

    // Loading img for normal test
    let image = firebase.storage().ref(`/test${id_db}/question${question_number}`);
    if (theme_db != ("ЕГЭ" || "ОГЭ" || "ВПР")) {
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
  }
});

function checkTimer(id) {
  firebase.database().ref(`school${user.school}/tests/${klass}/test${id}`).on('value', (snapshot) => {
    let timerMinutesTest = snapshot.val().timerMinutes;
    let timerSecondsTest = snapshot.val().timerSeconds;
    let timerNeed = snapshot.val().timer;
    let time = 0;

    if (timerNeed === true) {
      Swal.fire({
        icon: 'info',
        title: 'Осторожно!',
        text: 'При нажатии ОК - Таймер начнет обратный отсчет',
        showDenyButton: true,
        denyButtonText: 'Назад',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          if (parseInt(timerSecondsTest) === 0) {
            time = (parseInt(timerMinutesTest) * 60) * 1000;
          } else {
            time = (parseInt(timerMinutesTest) * 60000) + parseInt(timerSecondsTest) * 1000;
          }

          let timerTest = setTimeout(() => {
            clearInterval(intervalTimer);
            send_test(id, `${user.fullName}`);
            $(`#testAcc${id}`).collapse('hide');

            localStorage.setItem(`testPass${id}`, `${id}`);

            let btnSendTest = document.getElementById(`send-test${id}`);
            btnSendTest.disabled = true;
          }, time);

          let intervalTimer = setInterval(() => {
            if (timerSecondsTest === 0) {
              timerMinutesTest -= 1;
              timerSecondsTest = 60;
            }

            if (parseInt(timerMinutesTest) === 0 && parseInt(timerSecondsTest) === 3) {
              localStorage.setItem(`testPass${id}`, `${id}`);
              stopTimer();
            }

            timerSecondsTest -= 1;

            const timerDiv = document.getElementById(`timerDiv${id}`);
            if (timerSecondsTest < 10) {
              document.head.title = `${timerMinutesTest}:0${timerSecondsTest}`;
              timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutesTest}:0${timerSecondsTest}`;
            } else {
              document.head.title = `${timerMinutesTest}:${timerSecondsTest}`;
              timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutesTest}:${timerSecondsTest}`;
            }
          }, 1000);
        } else if (result.isDenied) {
          $(`#collapse${id}`).collapse('hide');
        }
      });
    } else { }
  });
}

function stopTimer() {
  try {
    clearTimeout(timerTest);
    clearInterval(intervalTimer);

    setTimeout(() => {
      location.reload();
    }, 2500);
  } catch { }
}