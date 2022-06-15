// window onload
onload = () => {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user == null) {
    location.href = 'index.html';
  } else if (user.who === 'teacher') {
    const studentDiv = document.querySelector('.main-student-lessons');
    studentDiv.parentNode.removeChild(studentDiv);

    document.querySelector('.main-teacher-lessons').style.display = 'block';
  } else if (user.who === 'student') {
    const teacherDiv = document.querySelector('.main-teacher-lessons');
    teacherDiv.parentNode.removeChild(teacherDiv);

    document.querySelector('.main-student-lessons').style.display = 'block';
  }
};

Vue.component('teacher-lessons-app', {
  template: `
        <div class="main-teacher-lessons">Test teacher lessons app</div>
    `,
});

Vue.component('student-lessons-app', {
  template: `
        <div class="main-student-lessons">Test student lessons app</div>
    `,
});

let ILVue = new Vue({
  el: '#app',
});
