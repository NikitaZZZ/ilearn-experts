let fontSize = 15;
let elems = ['p', 'button', 'a', 'span'];

function plus_fs() {
    fontSize++;

    elems.forEach(elem => {
        document.querySelectorAll(elem).forEach(element => element.style.fontSize = `${fontSize}px`);
    })

    for (let i = 1; i < 6; i++) {
        let h = document.querySelectorAll(`h${i}`);

        h.forEach(element => element.style.fontSize = `${fontSize}px`);
    }
}

function minus_fs() {
    fontSize--;

    elems.forEach(elem => {
        document.querySelectorAll(elem).forEach(element => element.style.fontSize = `${fontSize}px`);
    })

    for (let i = 1; i < 6; i++) {
        let h = document.querySelectorAll(`h${i}`);

        h.forEach(element => element.style.fontSize = `${fontSize}px`);
    }
}
