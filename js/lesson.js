localStorage.getItem('user') == null ? location.href = "index.html" : console.log('ok');

const user = JSON.parse(localStorage.getItem("user"));

firebase.database().ref(`school${user.school}/schoolwork/lessons${user.klass}`).on('child_added', (data) => {
    const lessonValue = data.val();
    
    document.getElementById('schoolwork').innerHTML += `
        <a data-bs-target="#modal${lessonValue.id}" data-bs-toggle="modal" style="cursor: pointer" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                    LAR SchoolWork
                </h5>
                <small class="text-muted">Открыть</small>
            </div>
            <p class="mb-1">${lessonValue.theme}</p>
        </a>

        <div class="modal fade" id="modal${lessonValue.id}">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${lessonValue.theme}</h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm" id="links-to-cospects">
                                    <p class="fw-bold">Ссылки на конспекты</p>

                                    <div id="list-links-conspects">
                                        <ul id="links-to-conspects-list-${lessonValue.id}"></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <p class="fw-bold">Описание, главные тезисы</p>

                                <div class="col-sm mb-3" id="description">
                                    <li class="list-group-item">${lessonValue.description}</li>
                                </div>

                                <div class="col-sm" id="main-theses">
                                    <ul id="main-theses-list-${lessonValue.id}"></ul>
                                </div>
                            </div>
                            <div class="row">
                                <p class="fw-bold">Задания</p>
                                
                                <div class="col-sm" id="tasks">
                                    <ul class="list-group" id="tasks-text-list-${lessonValue.id}"></ul>
                                    <ul class="list-group" id="tasks-link-list-${lessonValue.id}"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    text_of_lesson = [
        {
            elem: `#main-theses-list-${lessonValue.id}`,
            array: lessonValue.listTheses
        },
        {
            elem: `#tasks-text-list-${lessonValue.id}`,
            array: lessonValue.listTasksText
        }
    ]

    links_of_lesson = [
        {
            elem: `#tasks-link-list-${lessonValue.id}`,
            array: lessonValue.listTasksLink
        },
        {
            elem: `#links-to-conspects-list-${lessonValue.id}`,
            array: lessonValue.listLinks
        }
    ]

    text_of_lesson.forEach((text) => {
        text.array.forEach((elem) => {
            document.querySelector(text.elem).innerHTML += `<li class="list-group-item">${elem}</li>`;
        });
    });

    links_of_lesson.forEach((link) => {
        link.array.forEach((elem) => {
            if (elem.name == undefined) {
                document.querySelector(link.elem).innerHTML += `<li class="list-group-item"><a href="${elem}" target="_blank">${elem}</a></li>`;
            } else {
                document.querySelector(link.elem).innerHTML += `<li class="list-group-item"><a href="${elem.link}" target="_blank">${elem.name}</a></li>`;
            }
        });
    });
});

firebase.database().ref(`school${user.school}/schoolwork/lessons`).on('child_added', (data) => {
    const lessonValue = data.val();
    
    document.getElementById('schoolwork').innerHTML += `
        <a data-bs-target="#modal${lessonValue.id}" data-bs-toggle="modal" style="cursor: pointer" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                    <img alt="icon" src="img/lar_black.png" style="width: 30px; height: 30px;" class="d-inline-block align-text-top">
                    LAR SchoolWork
                </h5>
                <small class="text-muted">Открыть</small>
            </div>
            <p class="mb-1">${lessonValue.theme}</p>
        </a>

        <div class="modal fade" id="modal${lessonValue.id}">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${lessonValue.theme}</h5>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm" id="links-to-cospects">
                                    <p class="fw-bold">Ссылки на конспекты</p>

                                    <div id="list-links-conspects">
                                        <ul id="links-to-conspects-list-${lessonValue.id}"></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <p class="fw-bold">Описание, главные тезисы</p>

                                <div class="col-sm mb-3" id="description">
                                    <li class="list-group-item">${lessonValue.description}</li>
                                </div>

                                <div class="col-sm" id="main-theses">
                                    <ul id="main-theses-list-${lessonValue.id}"></ul>
                                </div>
                            </div>
                            <div class="row">
                                <p class="fw-bold">Задания</p>
                                
                                <div class="col-sm" id="tasks">
                                    <ul class="list-group" id="tasks-text-list-${lessonValue.id}"></ul>
                                    <ul class="list-group" id="tasks-link-list-${lessonValue.id}"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    text_of_lesson = [
        {
            elem: `#main-theses-list-${lessonValue.id}`,
            array: lessonValue.listTheses
        },
        {
            elem: `#tasks-text-list-${lessonValue.id}`,
            array: lessonValue.listTasksText
        }
    ]

    links_of_lesson = [
        {
            elem: `#tasks-link-list-${lessonValue.id}`,
            array: lessonValue.listTasksLink
        },
        {
            elem: `#links-to-conspects-list-${lessonValue.id}`,
            array: lessonValue.listLinks
        }
    ]

    text_of_lesson.forEach((text) => {
        text.array.forEach((elem) => {
            document.querySelector(text.elem).innerHTML += `<li class="list-group-item">${elem}</li>`;
        });
    });

    links_of_lesson.forEach((link) => {
        link.array.forEach((elem) => {
            if (elem.name == undefined) {
                document.querySelector(link.elem).innerHTML += `<li class="list-group-item"><a href="${elem}" target="_blank">${elem}</a></li>`;
            } else {
                document.querySelector(link.elem).innerHTML += `<li class="list-group-item"><a href="${elem.link}" target="_blank">${elem.name}</a></li>`;
            }
        });
    });
})
