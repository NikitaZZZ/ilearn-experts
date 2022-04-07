const notifications_container = document.getElementById('notifications-container');

let list = [];
let list_for = ['tests', 'schoolwork'];

list_for.forEach((elem) => {
    firebase.database().ref(`school${user.school}/${elem}/${user.klass}`).on('child_added', (snapshot) => list.push([snapshot.val()]));
})

notifications_container.innerHTML += `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <img src="..." class="rounded me-2" alt="...">
            <strong class="me-auto">Bootstrap</strong>
            <small class="text-muted">2 секунды назад</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
        </div>
        <div class="toast-body">
            Внимание, всплывающие сообщения складываются автоматически
        </div>
    </div>
`;

