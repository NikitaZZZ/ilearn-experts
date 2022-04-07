// Порядковый номер таска
let currentNumber = 0;

function setCurrentNumber(name, currentNumber) {
    db.collection(`currentNumber`).doc(`currentNumber${name}`).set({
        currentNumber: currentNumber
    })
}

function getCurrentNumber(name) {
    db.collection(`currentNumber`).doc(`currentNumber${name}`).get().then((doc) => {
        currentNumber = doc.data().currentNumber;
    })
}

// Компонент task - задание
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
        <div class="card mb-3" style="max-width: 18rem;">
            <div class="card-header">{{ data.title }}</div>
            <div class="card-body">
                <p class="card-text" v-if="data.desc !== ''">{{ data.desc }}</p>

                <button class="btn btn-outline-success task__done" @click="task_done()"><i class="fas fa-check" id="check"></i></button>
            </div>
        </div>
    `
});

// Vue часть
let vue = new Vue({
    el: '#app',
    data: {
        // Содержание объекта в массиве
        new_task: {
            name: '',
            title: '',
            desc: '',
            id: '',
        },
 
        // Массивы To Do
        tasks: [],
    },
 
    // Методы
    methods: {
        // Добавить задание
        add_task() {
            if (this.new_task.title === '' 
            && this.new_task.desc === '') {
                Swal.fire({
                    title: "Заполни все поля!",
                    icon: "error"
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Задание добавлено!',
                    showConfirmButton: false,
                    timer: 1500
                });

                this.tasks.push({
                    name: this.new_task.name,
                    title: this.new_task.title,
                    desc: this.new_task.desc,
                    id: getRandId(),
                });

                getCurrentNumber(this.new_task.name);
                add_task_db(currentNumber);

                currentNumber += 1;
                localStorage.setItem("currentNumberName", currentNumber);

                localStorage.setItem("name_todo", this.new_task.name);

                setCurrentNumber(this.new_task.name, currentNumber);
            }
        },

        // Удалить задание
        delete_task(name, id_task) {
            const index = this.tasks.findIndex(item => item.id == id_task);

            db.collection('tasks').doc(`${name}${id_task}`).get().then(() => {
                db.collection("tasks").doc(`${name}${id_task}`).delete().then(() => {
                    console.log("Successful!");
                });
            });

            this.tasks.splice(index, 1);

            currentNumber -= 1;
            localStorage.setItem(`currentNumber${name}`, currentNumber);

            setCurrentNumber(name, currentNumber);
        },
    }
});

function add_task_db(index) {
    let title = document.getElementById("input").value;
    let nameElem = document.getElementById("name").value;
    let desc = document.getElementById("textarea").value;
    let id = vue.$data.tasks[index].id;

    db.collection("tasks").doc(`${nameElem}${id}`).set({
        name: nameElem,
        title: title,
        desc: desc,
        id: id,
    });
}