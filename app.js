const addBtn = document.querySelector('#add');
const delSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#424242"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
const checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#424242"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>'
const checkButton = document.querySelectorAll('.check');
const container = document.querySelector('.List');
// Implementing an Event Handler function for invoking a button click

let Lists = [
    {
        task: 'Assignments',
        mark: 'yes'
    },
    {
        task: 'Web Projects',
        mark: 'no'
    },
    
]

function task(task, mark) {
    this.task = task;
    this.mark = mark;
}

const saveData = () => {
    localStorage.setItem("data",container.innerHTML);
}

const loadData = () => {    
    container.innerHTML = localStorage.getItem("data");
}

const toDoList = () => {

    container.innerHTML = '';
    // saveData();
    let index = 0;

    for (x of Lists) {
        let div = document.createElement('div');
        div.classList.add('task');

        let content = document.createElement('p');
        content.classList.add('p');
        content.innerHTML = x.task;

        let btnDiv = document.createElement('Div');
        btnDiv.classList.add('btns');

        let delBtn = document.createElement('Button');
        delBtn.classList.add(`del-${index}`);
        delBtn.classList.add('del')
        delBtn.id = index;
        delBtn.innerHTML = delSvg;

        let checkBtn = document.createElement('Button');
        checkBtn.classList.add(`check-${index}`);
        checkBtn.classList.add('check');

        checkBtn.innerHTML = checkSvg;

        if (x.mark == 'yes') {
            content.style.textDecoration = 'line-through';
        } else {
            content.style.textDecoration = '';
        }   


        div.appendChild(content);
        div.appendChild(btnDiv);
        btnDiv.appendChild(checkBtn);
        btnDiv.appendChild(delBtn);
        container.appendChild(div);


        checkBtn.addEventListener('click', (e) => {
            console.log(e.target.classList);
            if (x.mark === 'yes') {
                x.mark = 'no';
                content.style.textDecoration = '';
            } else {
                x.mark = 'yes';
                content.style.textDecoration = 'line-through';
            }
            saveData();
        });


        delBtn.addEventListener('click', () => {
            let delclass = delBtn.className;
            let index = delclass.match(/del-(\d+)/)[1];
            saveData();
            deleteTask(parseInt(index));
        })
        index++;
    }
}

toDoList();

addBtn.addEventListener('click', () => {
    const taskval = document.querySelector('input').value;
    const marker = 'no';
    const message = document.querySelector('.message');


    if (taskval === '') {
        alert('You must write something');
    }
    else {
        message.classList.add('message1');

        const newTask = new task(taskval, marker);
        Lists.push(newTask);
        toDoList();
        saveData();
    }
})

const deleteTask = (index) => {
    Lists.splice(index, 1);
    loadData();
    toDoList();
}

window.onload = ()=>{
    loadData();
    toDoList();
}

// const tempList = new Map();

// tempList.set(1,'task1');
// tempList.set(2,'task2');

// console.log(tempList.get(2));

// tempList.delete(2);