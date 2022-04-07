localStorage.getItem('user') == null ? location.href = "index.html" : console.log('ok');

const user = JSON.parse(localStorage.getItem("user"));

let vue = new Vue({
    el: '#schoolwork',
    data: {
        lessons: [],

        formCreateLesson: {
            author: user.fullName,

            theme: '',
            description: '',
            thesis: '',

            taskText: '',
            taskLink: '',
            
            klassNumber: '',
            klassWord: '',

            link: '',
            textLink: '',

            lessonForAll: false,

            listTheses: [],
            listTasksText: [],
            listTasksLink: [],

            listLinks: [],
        }
    },

    methods: {
        addThesis() {
            if (this.formCreateLesson.thesis != '')
                this.formCreateLesson.listTheses.push(this.formCreateLesson.thesis);
        },

        addTaskLink() {
            if (this.formCreateLesson.taskLink != '')
                this.formCreateLesson.listTasksLink.push(this.formCreateLesson.taskLink);
        },

        addTaskText() {
            if (this.formCreateLesson.taskText != '')
                this.formCreateLesson.listTasksText.push(this.formCreateLesson.taskText);
        },

        addLink() {
            if (this.formCreateLesson.link != '')
                this.formCreateLesson.listLinks.push({
                    name: this.formCreateLesson.textLink,
                    link: this.formCreateLesson.link
                });
        },

        createLesson() {
            const lessonId = getRandId();
            const klass = `${this.formCreateLesson.klassNumber}${this.formCreateLesson.klassWord}`;

            if (!this.formCreateLesson.lessonForAll) {
                firebase.database().ref(`school${user.school}/schoolwork/lessons${klass}/lesson${lessonId}`).set({
                    author: this.formCreateLesson.author,
                    id: lessonId,
                    klass: klass,
                    theme: this.formCreateLesson.theme,
                    description: this.formCreateLesson.description,
    
                    listTheses: this.formCreateLesson.listTheses,
                    listTasksText: this.formCreateLesson.listTasksText,
                    listTasksLink: this.formCreateLesson.listTasksLink,
                    listLinks: this.formCreateLesson.listLinks,
                });
            } else {
                firebase.database().ref(`school${user.school}/schoolwork/lessons/lesson${lessonId}`).set({
                    author: this.formCreateLesson.author,
                    id: lessonId,
                    theme: this.formCreateLesson.theme,
                    description: this.formCreateLesson.description,
    
                    listTheses: this.formCreateLesson.listTheses,
                    listTasksText: this.formCreateLesson.listTasksText,
                    listTasksLink: this.formCreateLesson.listTasksLink,
                    listLinks: this.formCreateLesson.listLinks,
                });
            }
        }
    }
});

let info_lesson = [
    {
        input: '#main-theses-input',
        func: vue.addThesis
    }, 
    {
        input: '#add-task-input',
        func: vue.addTask
    },
    {
        input: '#link-to-conspects-input',
        func: vue.addLink
    },
];

// think about this code
function justOneSymbol(input) {
    input.value.length <= 1 ? true : input.value = input.value[0];
}

info_lesson.forEach((elem) => {
    document.querySelector(elem.input).addEventListener('keyup', (e) => {
        e.key == "Enter" ? elem.func() : null
    })
});