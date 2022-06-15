let user = JSON.parse(localStorage.getItem('user'));

function chatWithStudents() {
  let user = JSON.parse(localStorage.getItem('user'));

  document.getElementById('chatUI').innerHTML = '';

  firebase
    .database()
    .ref(`school${user.school}/students/`)
    .on('child_added', (data) => {
      document.getElementById('chatUI').innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start" style="cursor: pointer" onclick="chatTeacherAndStudent('${
              data.val().fullName
            }', '${user.fullName}', '${data.val().klass}')">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${data.val().fullName}</div>
                </div>
                <span class="badge secondary rounded-pill" id="isOnline${data.val().id}"></span>
            </li>
        `;
    });

  firebase
    .database()
    .ref(`school${user.school}/students/`)
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(`school${user.school}/students/${key}`)
          .on('value', (snapshot) => {
            try {
              const isOnline = snapshot.val().isOnline;
              let isOnlineSpan = document.getElementById(`isOnline${snapshot.val().id}`);

              switch (isOnline) {
                case true:
                  isOnlineSpan.innerHTML = `В сети`;
                  isOnlineSpan.className = `badge bg-success rounded-pill`;
                  break;
                case false:
                  isOnlineSpan.innerHTML = `Не в сети`;
                  isOnlineSpan.className = `badge bg-secondary rounded-pill`;
                  break;
              }
            } catch {}
          });
      }
    });
}

// Чат ученика и учителей
function chatWithTeachersAndStudents() {
  let user = JSON.parse(localStorage.getItem('user'));

  document.getElementById('chatUI').innerHTML = ``;

  firebase
    .database()
    .ref(`school${user.school}/students/`)
    .on('child_added', (data) => {
      if (user.fullName === data.val().fullName) {
      } else if (user.fullName !== data.val().fullName) {
        document.getElementById('chatUI').innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-start" style="cursor: pointer" onclick="chatStudentAndTeacher('${
                  data.val().fullName
                }', '${user.fullName}', '${data.val().klass}')">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${data.val().fullName}</div>
                    </div>
                    <span class="badge secondary rounded-pill" id="isOnline${data.val().id}"></span>
                </li>
            `;
      }
    });

  firebase
    .database()
    .ref(`school${user.school}/students/`)
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(`school${user.school}/students/${key}`)
          .on('value', (snapshot) => {
            try {
              const isOnline = snapshot.val().isOnline;
              let isOnlineSpan = document.getElementById(`isOnline${snapshot.val().id}`);

              switch (isOnline) {
                case true:
                  isOnlineSpan.innerHTML = `В сети`;
                  isOnlineSpan.className = `badge bg-success rounded-pill`;
                  break;
                case false:
                  isOnlineSpan.innerHTML = `Не в сети`;
                  isOnlineSpan.className = `badge bg-secondary rounded-pill`;
                  break;
              }
            } catch {}
          });
      }
    });

  firebase
    .database()
    .ref(`school${user.school}/teachers/`)
    .on('child_added', (data) => {
      document.getElementById('chatUI').innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start" style="cursor: pointer" onclick="chatStudentAndTeacher('${
              data.val().fullName
            }', '${user.fullName}', '${data.val().teacherClass}')">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${data.val().fullName}</div>
                </div>
                <span class="badge secondary rounded-pill" id="isOnline${data.val().id}"></span>
            </li>
        `;
    });

  firebase
    .database()
    .ref(`school${user.school}/teachers/`)
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(`school${user.school}/teachers/${key}`)
          .on('value', (snapshot) => {
            try {
              const isOnline = snapshot.val().isOnline;
              let isOnlineSpan = document.getElementById(`isOnline${snapshot.val().id}`);

              switch (isOnline) {
                case true:
                  isOnlineSpan.innerHTML = `В сети`;
                  isOnlineSpan.className = `badge bg-success rounded-pill`;
                  break;
                case false:
                  isOnlineSpan.innerHTML = `Не в сети`;
                  isOnlineSpan.className = `badge bg-secondary rounded-pill`;
                  break;
              }
            } catch {}
          });
      }
    });
}

// Ученик с учителем / одноклассниками
function renderMessagesStudent(username, name, klass) {
  let user = JSON.parse(localStorage.getItem('user'));
  firebase
    .database()
    .ref(
      `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesFrom${username}`,
    )
    .orderByChild('date/minutes')
    .on('child_added', (data) => {
      try {
        if (data.val().voiceId) {
          let voiceId = data.val().voiceId;
          let voiceMsg = data.val().voiceMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`voices/${name}/${voiceMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${username}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${voiceId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Голосовое сообщение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${voiceId}`).toast('show');
          }
        } else if (data.val().imageId) {
          let imageId = data.val().imageId;
          let imageMsg = data.val().imageMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`images/${username}/${imageMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${username}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Изображение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${imageId}`).toast('show');
          }
        } else {
          const fullName = data.val().fullName;
          const message = data.val().message;

          const hour = data.val().date.hour;
          const minutes = data.val().date.minutes;
          const seconds = data.val().date.seconds;

          const day = data.val().date.day;
          const month = data.val().date.month;
          const year = data.val().date.year;

          let messageId = data.val().messageId;

          document.getElementById('messages').innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                            <h5 class="card-title">${fullName}</h5>
                            <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
                            <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
                            <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                        </div>
                    </div>
                `;

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${messageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${hour}:${minutes}:${seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    ${message}
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${messageId}`).toast('show');
          }
        }
      } catch {}
    });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesFrom${username}`,
    )
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(
            `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
              .toLowerCase()
              .trim()}/messagesFrom${username}/${key}`,
          )
          .on('value', (snapshot) => {
            let checkMsg = snapshot.val().checkMessage;
            let messageId = snapshot.val().messageId;

            if (checkMsg === false && user.fullName !== snapshot.val().fullName) {
              checkMsg = true;
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
              firebase
                .database()
                .ref(
                  `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
                    .toLowerCase()
                    .trim()}/messagesFrom${username}/${key}/checkMessage`,
                )
                .set(checkMsg);
            } else if (checkMsg === true) {
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
            }
          });
      }
    });

  // firebase.database().ref(`school${user.school}/students/student${name.toLowerCase().trim()} ${klass.toLowerCase().trim()}/messagesTo${username}`).orderByChild('date/minutes').on('child_added', (data) => {
  //     try {
  //         if (data.val().voiceId) {
  //             let voiceId = data.val().voiceId;
  //             let voiceMsg = data.val().voiceMsg;
  //             let date = data.val().date;

  //             console.log(username, voiceMsg);

  //             setTimeout(() => {
  //                 storageRef.child(`voices/${username}/${voiceMsg}`).getDownloadURL().then((url) => {
  //                     document.getElementById('messages').innerHTML += `
  //                         <div class="card">
  //                             <div class="card-body">
  //                                 <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                                 <h5 class="card-title">${username}</h5>
  //                                 <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
  //                                 <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
  //                                 <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                             </div>
  //                         </div>
  //                     `;
  //                 }).catch((error) => { console.log(error); });
  //             }, 2000);
  //         } else if (data.val().imageId) {
  //             let imageId = data.val().imageId;
  //             let imageMsg = data.val().imageMsg;
  //             let fullName = data.val().fullName;
  //             let date = data.val().date;

  //             storageRef.child(`images/${name}/${imageMsg}`).getDownloadURL().then((url) => {
  //                 document.getElementById('messages').innerHTML += `
  //                     <div class="card">
  //                         <div class="card-body">
  //                             <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                             <h5 class="card-title">${name}</h5>
  //                             <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
  //                             <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
  //                             <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                         </div>
  //                     </div>
  //                 `;
  //             }).catch((error) => { console.log(error); });

  //             if (fullName !== user.fullName && document.getElementById('chat').className !== 'modal fade show') {
  //                 document.getElementById('notifications').innerHTML += `
  //                     <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
  //                         <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
  //                             <div class="toast-header">
  //                                 <strong class="me-auto">${fullName}</strong>
  //                                 <small>${date.hour}:${date.minutes}:${date.seconds}</small>
  //                                 <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
  //                             </div>
  //                             <div class="toast-body">
  //                                 Изображение
  //                             </div>
  //                         </div>
  //                     </div>
  //                 `;

  //                 $(`#notification${imageId}`).toast('show');
  //             }
  //         } else {
  //             const fullName = data.val().fullName;
  //             const message = data.val().message;

  //             const hour = data.val().date.hour;
  //             const minutes = data.val().date.minutes;
  //             const seconds = data.val().date.seconds;

  //             const day = data.val().date.day;
  //             const month = data.val().date.month;
  //             const year = data.val().date.year;

  //             let messageId = data.val().messageId;

  //             document.getElementById('messages').innerHTML += `
  //                 <div class="card">
  //                     <div class="card-body">
  //                         <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                         <h5 class="card-title">${fullName}</h5>
  //                         <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
  //                         <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
  //                         <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                     </div>
  //                 </div>
  //             `;
  //         }
  //     } catch { }
  // });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesTo${username}`,
    )
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(
            `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
              .toLowerCase()
              .trim()}/messagesTo${username}/${key}`,
          )
          .on('value', (snapshot) => {
            let checkMsg = snapshot.val().checkMessage;
            let messageId = snapshot.val().messageId;

            if (checkMsg === false && user.fullName !== snapshot.val().fullName) {
              checkMsg = true;
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
              firebase
                .database()
                .ref(
                  `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
                    .toLowerCase()
                    .trim()}/messagesTo${username}/${key}/checkMessage`,
                )
                .set(checkMsg);
            } else {
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
            }
          });
      }
    });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${name.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesTo${username}`,
    )
    .orderByChild('date/minutes')
    .on('child_added', (data) => {
      try {
        if (data.val().voiceId) {
          let voiceId = data.val().voiceId;
          let voiceMsg = data.val().voiceMsg;
          let date = data.val().date;

          setTimeout(() => {
            storageRef
              .child(`voices/${username}/${voiceMsg}`)
              .getDownloadURL()
              .then((url) => {
                document.getElementById('messages').innerHTML += `
                            <div class="card">
                                <div class="card-body">
                                    <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                    <h5 class="card-title">${name}</h5>
                                    <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                    <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                    <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                                </div>
                            </div>
                        `;
              })
              .catch((error) => {
                console.log(error);
              });
          }, 2000);
        } else if (data.val().imageId) {
          let imageId = data.val().imageId;
          let imageMsg = data.val().imageMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`images/${username}/${imageMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${name}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Изображение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${imageId}`).toast('show');
          }
        } else {
          const fullName = data.val().fullName;
          const message = data.val().message;

          const hour = data.val().date.hour;
          const minutes = data.val().date.minutes;
          const seconds = data.val().date.seconds;

          const day = data.val().date.day;
          const month = data.val().date.month;
          const year = data.val().date.year;

          let messageId = data.val().messageId;

          document.getElementById('messages').innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                            <h5 class="card-title">${fullName}</h5>
                            <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
                            <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
                            <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                        </div>
                    </div>
                `;
        }
      } catch {}
    });
}

// Учитель с учениками
function renderMessagesTeacher(username, name, klass) {
  let user = JSON.parse(localStorage.getItem('user'));

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesFrom${name}`,
    )
    .orderByChild('date/minutes')
    .on('child_added', (data) => {
      try {
        if (data.val().voiceId) {
          let voiceId = data.val().voiceId;
          let voiceMsg = data.val().voiceMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`voices/${username}/${voiceMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${name}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${voiceId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Голосовое сообщение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${voiceId}`).toast('show');
          }
        } else if (data.val().imageId) {
          let imageId = data.val().imageId;
          let imageMsg = data.val().imageMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`images/${username}/${imageMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${name}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Изображение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${imageId}`).toast('show');
          }
        } else {
          const fullName = data.val().fullName;
          const message = data.val().message;

          const hour = data.val().date.hour;
          const minutes = data.val().date.minutes;
          const seconds = data.val().date.seconds;

          const day = data.val().date.day;
          const month = data.val().date.month;
          const year = data.val().date.year;

          const messageId = data.val().messageId;

          document.getElementById('messages').innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                            <h5 class="card-title">${fullName}</h5>
                            <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
                            <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
                            <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                        </div>
                    </div>
                `;

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${messageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${hour}:${minutes}:${seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    ${message}
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${messageId}`).toast('show');
          }
        }
      } catch {}
    });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesFrom${name}`,
    )
    .on('value', (snapshot) => {
      for (let key in snapshot.val()) {
        firebase
          .database()
          .ref(
            `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
              .toLowerCase()
              .trim()}/messagesFrom${name}/${key}`,
          )
          .on('value', (snapshot) => {
            let checkMsg = snapshot.val().checkMessage;
            let messageId = snapshot.val().messageId;

            if (checkMsg === false && user.fullName !== snapshot.val().fullName) {
              checkMsg = true;
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
              firebase
                .database()
                .ref(
                  `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
                    .toLowerCase()
                    .trim()}/messagesFrom${name}/${key}/checkMessage`,
                )
                .set(checkMsg);
            } else if (checkMsg === true) {
              document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
            }
          });
      }
    });

  // firebase.database().ref(`school${user.school}/students/student${username.toLowerCase().trim()} ${klass.toLowerCase().trim()}/messagesTo${name}`).orderByChild('date/minutes').on('child_added', (data) => {
  //     try {
  //         if (data.val().voiceId) {
  //             let voiceId = data.val().voiceId;
  //             let voiceMsg = data.val().voiceMsg;
  //             let date = data.val().date;

  //             setTimeout(() => {
  //                 storageRef.child(`voices/${name}/${voiceMsg}`).getDownloadURL().then((url) => {
  //                     document.getElementById('messages').innerHTML += `
  //                         <div class="card">
  //                             <div class="card-body">
  //                                 <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                                 <h5 class="card-title">${name}</h5>
  //                                 <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
  //                                 <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
  //                                 <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                             </div>
  //                         </div>
  //                     `;
  //                 }).catch((error) => { console.log(error); });
  //             }, 2000);
  //         } else if (data.val().imageId) {
  //             let imageId = data.val().imageId;
  //             let imageMsg = data.val().imageMsg;
  //             let fullName = data.val().fullName;
  //             let date = data.val().date;

  //             storageRef.child(`images/${name}/${imageMsg}`).getDownloadURL().then((url) => {
  //                 document.getElementById('messages').innerHTML += `
  //                     <div class="card">
  //                         <div class="card-body">
  //                             <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                             <h5 class="card-title">${name}</h5>
  //                             <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
  //                             <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
  //                             <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                         </div>
  //                     </div>
  //                 `;
  //             }).catch((error) => { console.log(error); });

  //             if (fullName !== user.fullName && document.getElementById('chat').className !== 'modal fade show') {
  //                 document.getElementById('notifications').innerHTML += `
  //                     <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
  //                         <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
  //                             <div class="toast-header">
  //                                 <strong class="me-auto">${fullName}</strong>
  //                                 <small>${date.hour}:${date.minutes}:${date.seconds}</small>
  //                                 <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
  //                             </div>
  //                             <div class="toast-body">
  //                                 Изображение
  //                             </div>
  //                         </div>
  //                     </div>
  //                 `;

  //                 $(`#notification${imageId}`).toast('show');
  //             }
  //         } else {
  //             const fullName = data.val().fullName;
  //             const message = data.val().message;

  //             const hour = data.val().date.hour;
  //             const minutes = data.val().date.minutes;
  //             const seconds = data.val().date.seconds;

  //             const day = data.val().date.day;
  //             const month = data.val().date.month;
  //             const year = data.val().date.year;

  //             const messageId = data.val().messageId;

  //             document.getElementById('messages').innerHTML += `
  //                 <div class="card">
  //                     <div class="card-body">
  //                         <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
  //                         <h5 class="card-title">${fullName}</h5>
  //                         <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
  //                         <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
  //                         <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
  //                     </div>
  //                 </div>
  //             `;
  //         }
  //     } catch { }
  // });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesTo${name}`,
    )
    .on('value', (snapshot) => {
      try {
        for (let key in snapshot.val()) {
          firebase
            .database()
            .ref(
              `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
                .toLowerCase()
                .trim()}/messagesTo${name}/${key}`,
            )
            .on('value', (snapshot) => {
              let checkMsg = snapshot.val().checkMessage;
              let messageId = snapshot.val().messageId;

              if (checkMsg === false && user.fullName !== snapshot.val().fullName) {
                checkMsg = true;
                const checkMsgElem = (document.getElementById(
                  `checkMessage${messageId}`,
                ).className = 'text-primary');
                firebase
                  .database()
                  .ref(
                    `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
                      .toLowerCase()
                      .trim()}/messagesTo${name}/${key}/checkMessage`,
                  )
                  .set(checkMsg);
              } else if (checkMsg === true) {
                document.getElementById(`checkMessage${messageId}`).className = 'text-primary';
              }
            });
        }
      } catch {}
    });

  firebase
    .database()
    .ref(
      `school${user.school}/students/student${username.toLowerCase().trim()} ${klass
        .toLowerCase()
        .trim()}/messagesTo${name}`,
    )
    .orderByChild('date/minutes')
    .on('child_added', (data) => {
      try {
        if (data.val().voiceId) {
          let voiceId = data.val().voiceId;
          let voiceMsg = data.val().voiceMsg;
          let date = data.val().date;

          console.log(voiceId, `voices/${name}${voiceMsg}`);
          setTimeout(() => {
            storageRef
              .child(`voices/${name}/${voiceMsg}`)
              .getDownloadURL()
              .then((url) => {
                document.getElementById('messages').innerHTML += `
                            <div class="card">
                                <div class="card-body">
                                    <span class="text-secondary" id="checkMessage${voiceId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                    <h5 class="card-title">${username}</h5>
                                    <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                    <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                    <p class="card-text"><audio src="${url}" controls></audio> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                                </div>
                            </div>
                        `;
              })
              .catch((error) => {
                console.log(error);
              });
          }, 2000);
        } else if (data.val().imageId) {
          let imageId = data.val().imageId;
          let imageMsg = data.val().imageMsg;
          let fullName = data.val().fullName;
          let date = data.val().date;

          storageRef
            .child(`images/${name}/${imageMsg}`)
            .getDownloadURL()
            .then((url) => {
              document.getElementById('messages').innerHTML += `
                        <div class="card">
                            <div class="card-body">
                                <span class="text-secondary" id="checkMessage${imageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                                <h5 class="card-title">${username}</h5>
                                <span class="text-muted" style="float: right;">${date.hour}:${date.minutes}:${date.seconds}</span>
                                <span class="text-muted" style="margin-right: 0.5em; float: right;">${date.day}.${date.month}.${date.year}</span>
                                <p class="card-text"><img src="${url}" class="img-chats"> <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                            </div>
                        </div>
                    `;
            })
            .catch((error) => {
              console.log(error);
            });

          if (
            fullName !== user.fullName &&
            document.getElementById('chat').className !== 'modal fade show'
          ) {
            document.getElementById('notifications').innerHTML += `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: -1">
                            <div class="toast hide" id="notification${imageId}" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">${fullName}</strong>
                                    <small>${date.hour}:${date.minutes}:${date.seconds}</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                </div>
                                <div class="toast-body">
                                    Изображение
                                </div>
                            </div>
                        </div>
                    `;

            $(`#notification${imageId}`).toast('show');
          }
        } else {
          const fullName = data.val().fullName;
          const message = data.val().message;

          const hour = data.val().date.hour;
          const minutes = data.val().date.minutes;
          const seconds = data.val().date.seconds;

          const day = data.val().date.day;
          const month = data.val().date.month;
          const year = data.val().date.year;

          const messageId = data.val().messageId;

          document.getElementById('messages').innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <span class="text-secondary" id="checkMessage${messageId}" style="float: right"><i class="fas fa-check-double"></i></span>
                            <h5 class="card-title">${fullName}</h5>
                            <span class="text-muted" style="float: right;">${hour}:${minutes}:${seconds}</span>
                            <span class="text-muted" style="margin-right: 0.5em; float: right;">${day}.${month}.${year}</span>
                            <p class="card-text">${message} <span class="position-absolute top-0 start-100 translate-middle p-2 badge"></span></p>
                        </div>
                    </div>
                `;
        }
      } catch {}
    });
}

function chatTeacherAndStudent(username, myName, studentKlass) {
  document.getElementById('chatUI').innerHTML = `
        <div id="user"></div>

        <form id="chat">
            <div style="position: relative;" id="messages"></div>
        </form>

        <div class="input-group" id="sendMsgDiv">
            <input type="text" id="messageInput" class="form-control" placeholder="Сообщение">
            <button class="btn btn-primary" id="send-vm"><i class="fas fa-microphone"></i></button>
            <input type="file" id="file-input" style="display: none">
            <button class="btn btn-dark" id="send-image"><i class="fas fa-paperclip"></i></button>
            <button class="btn btn-success" id="sendMsg" onclick="sendMsgToStudent('${username}', '${myName}', '${studentKlass}')">Отправить</button>
        </div> 
    `;

  document.getElementById('user').innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <button style="border: none; background: none;" onclick="chatWithStudents()"><i class="fas fa-arrow-left"></i></button>
            <div class="ms-2 me-auto">
                <div class="fw-bold">${username}</div>
            </div>
            <span class="badge bg-secondary rounded-pill" id="isOnline${username}">Не в сети</span>
        </li>
    `;

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      sendMsgToStudent(username, myName, studentKlass);
    }
  });

  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  document.getElementById('send-image').addEventListener('click', () => {
    let fileInput = document.getElementById('file-input');

    fileInput.click();
    fileInput.addEventListener('change', (e) => {
      let file = e.target.files[0];
      let image_id = getRandId();

      storageRef
        .child(`images/${username}/${myName}${day}${month}${year}${hour}${minutes}${seconds}`)
        .put(file)
        .then(() => {
          firebase
            .database()
            .ref(
              `school${user.school}/students/student${username.toLowerCase().trim()} ${studentKlass
                .toLowerCase()
                .trim()}/messagesFrom${myName}/${image_id}`,
            )
            .set({
              fullName: myName,
              imageMsg: `${myName}${day}${month}${year}${hour}${minutes}${seconds}`,
              imageId: image_id,
              date: {
                hour: hour,
                minutes: minutes,
                seconds: seconds,
                day: day,
                month: month,
                year: year,
              },
            });
        });
    });
  });

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    let voices_counter = 0;
    let voices = [];
    let voice_id = getRandId();

    const isMobile =
      /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      // phone touch start
      document.querySelector('#send-vm').addEventListener('touchstart', function () {
        mediaRecorder.start();

        this.className = 'btn btn-dark';
        console.log('record start');
      });

      // phone touch end
      document.querySelector('#send-vm').addEventListener('touchend', function () {
        mediaRecorder.stop();
        this.className = 'btn btn-primary';
      });
    } else {
      // mousedown (start record vm)
      document.querySelector('#send-vm').addEventListener('mousedown', function () {
        mediaRecorder.start();

        this.className = 'btn btn-dark';
        console.log('record start');
      });

      // mouseup (end record vm)
      document.querySelector('#send-vm').addEventListener('mouseup', function () {
        mediaRecorder.stop();
        this.className = 'btn btn-primary';
      });
    }

    // send voice msg to storage and db
    mediaRecorder.addEventListener('dataavailable', function (event) {
      voices.push(event.data);

      storageRef
        .child(`voices/${username}/${myName}${day}${month}${year}${hour}${minutes}${seconds}`)
        .put(voices[voices_counter])
        .then(() => {
          console.log('Uploaded a blob!');
        });

      firebase
        .database()
        .ref(
          `school${user.school}/students/student${username.toLowerCase().trim()} ${studentKlass
            .toLowerCase()
            .trim()}/messagesFrom${myName}/${voice_id}`,
        )
        .set({
          fullName: myName,
          voiceMsg: `${myName}${day}${month}${year}${hour}${minutes}${seconds}`,
          voiceId: voice_id,
          date: {
            hour: hour,
            minutes: minutes,
            seconds: seconds,
            day: day,
            month: month,
            year: year,
          },
        });

      voices_counter++;
    });
  });

  renderMessagesTeacher(`${username}`, `${myName}`, `${studentKlass}`);
}

function chatStudentAndTeacher(username, myName, studentKlass) {
  document.getElementById('chatUI').innerHTML = `
        <div id="user"></div>

        <form id="chat">
            <div style="position: relative;" id="messages"></div>
        </form>

        <div class="input-group" id="sendMsgDiv">
            <input type="text" id="messageInput" class="form-control" placeholder="Сообщение">
            <input type="file" id="file-input" style="display: none">
            <button class="btn btn-dark" id="send-image"><i class="fas fa-paperclip"></i></button>
            <button class="btn btn-primary" id="send-vm"><i class="fas fa-microphone"></i></button>
            <button class="btn btn-success" id="sendMsg" onclick="sendMsgToTeacher('${username}', '${myName}', '${studentKlass}')">Отправить</button>
        </div> 
    `;

  document.getElementById('user').innerHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <button style="border: none; background: none;" onclick="chatWithTeachersAndStudents()"><i class="fas fa-arrow-left"></i></button>
            <div class="ms-2 me-auto">
                <div class="fw-bold">${username}</div>
            </div>
            <span class="badge bg-secondary rounded-pill" id="isOnline${username}">Не в сети</span>
        </li>
    `;

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      sendMsgToTeacher(username, myName, studentKlass);
    }
  });

  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  document.getElementById('send-image').addEventListener('click', () => {
    let fileInput = document.getElementById('file-input');

    fileInput.click();
    fileInput.addEventListener('change', (e) => {
      let file = e.target.files[0];
      let image_id = getRandId();

      storageRef
        .child(`images/${username}/${myName}${day}${month}${year}${hour}${minutes}${seconds}`)
        .put(file)
        .then(() => {
          firebase
            .database()
            .ref(
              `school${user.school}/students/student${myName.toLowerCase().trim()} ${studentKlass
                .toLowerCase()
                .trim()}/messagesTo${username}/${image_id}`,
            )
            .set({
              fullName: myName,
              imageMsg: `${myName}${day}${month}${year}${hour}${minutes}${seconds}`,
              imageId: image_id,
              date: {
                hour: hour,
                minutes: minutes,
                seconds: seconds,
                day: day,
                month: month,
                year: year,
              },
            });
        });
    });
  });

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    let voices_counter = 0;
    let voices = [];
    let voice_id = getRandId();

    const isMobile =
      /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      // phone touch start
      document.querySelector('#send-vm').addEventListener('touchstart', function () {
        mediaRecorder.start();

        this.className = 'btn btn-dark';
        console.log('record start');
      });

      // phone touch end
      document.querySelector('#send-vm').addEventListener('touchend', function () {
        mediaRecorder.stop();
        this.className = 'btn btn-primary';
      });
    } else {
      // mousedown (start record vm)
      document.querySelector('#send-vm').addEventListener('mousedown', function () {
        mediaRecorder.start();

        this.className = 'btn btn-dark';
        console.log('record start');
      });

      // mouseup (end record vm)
      document.querySelector('#send-vm').addEventListener('mouseup', function () {
        mediaRecorder.stop();
        this.className = 'btn btn-primary';
      });
    }

    // send data to database
    mediaRecorder.addEventListener('dataavailable', (event) => {
      voices.push(event.data);

      storageRef
        .child(`voices/${username}/${myName}${day}${month}${year}${hour}${minutes}${seconds}`)
        .put(voices[voices_counter])
        .then(() => {
          console.log('Uploaded a blob!');
        });

      firebase
        .database()
        .ref(
          `school${user.school}/students/student${myName.toLowerCase().trim()} ${studentKlass
            .toLowerCase()
            .trim()}/messagesTo${username}/${voice_id}`,
        )
        .set({
          fullName: myName,
          voiceMsg: `${myName}${day}${month}${year}${hour}${minutes}${seconds}`,
          voiceId: voice_id,
          date: {
            hour: hour,
            minutes: minutes,
            seconds: seconds,
            day: day,
            month: month,
            year: year,
          },
        });

      voices_counter++;
    });
  });

  renderMessagesStudent(`${username}`, `${myName}`, `${studentKlass}`);
}

function sendMsgToTeacher(username, name, studentKlass) {
  let user = JSON.parse(localStorage.getItem('user'));

  const message = document.getElementById('messageInput').value;
  if (message != '') {
    const date = new Date();

    const messageId = getRandId();

    console.log(username, name);
    firebase
      .database()
      .ref(
        `school${user.school}/students/student${name.toLowerCase().trim()} ${studentKlass
          .toLowerCase()
          .trim()}/messagesTo${username}/${messageId}`,
      )
      .set({
        fullName: name,
        message: message,
        checkMessage: false,
        messageId: messageId,
        date: {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });

    document.getElementById('messageInput').value = '';
  } else {
  }
}

function sendMsgToStudent(username, name, studentKlass) {
  let user = JSON.parse(localStorage.getItem('user'));

  const message = document.getElementById('messageInput').value;
  if (message != '') {
    const date = new Date();

    const messageId = getRandId();

    console.log(username, name);
    firebase
      .database()
      .ref(
        `school${user.school}/students/student${username.toLowerCase().trim()} ${studentKlass
          .toLowerCase()
          .trim()}/messagesFrom${name}/${messageId}`,
      )
      .set({
        fullName: name,
        message: message,
        checkMessage: false,
        messageId: messageId,
        date: {
          hour: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });

    document.getElementById('messageInput').value = '';
  } else {
  }
}
