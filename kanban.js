// Important Elements ko get kar rahe hain
let addBtn = document.getElementById('add');
let addTaskBtn = document.getElementById('addTask');
let modale = document.getElementById('modale');
let option = document.getElementById('select');
let todoList = document.getElementById('todoList');
let inProgress = document.getElementById('inProgress');
let doneList = document.getElementById('done');
let editTask = null;
let draggedTask = null;

// When "Add Task"  button click to open modal
addBtn.onclick = function () {
    modale.classList.add('show');
    clearInputs();
    editTask = null;
};

// When clcik "Add Task" button in modal
addTaskBtn.onclick = function () {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    let category = option.value;
    if (title === '' || desc === '' || category === 'Select') {
        alert('Please fill all fields and select a category.');
        return;
    }
    if (editTask) {
        editTask.querySelector('.task-title').innerText = title;
        editTask.querySelector('.task-desc').innerText = desc;
        moveTask(editTask, category);
    } else {
        let task = createTask(title, desc);
        addTaskToCategory(task, category);
    }
    modale.classList.remove('show');
    clearInputs();
};

// Make task
function createTask(title, desc) {
    let task = document.createElement('li');
    task.className = 'task';
    task.draggable = true;

    let titleElem = document.createElement('p');
    titleElem.className = 'task-title';
    titleElem.innerText = title;

    let descElem = document.createElement('p');
    descElem.className = 'task-desc';
    descElem.innerText = desc;

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.onclick = function () {
        document.getElementById('title').value = title;
        document.getElementById('desc').value = desc;
        option.value = findCategory(task);
        modale.classList.add('show');
        editTask = task;
    };
    task.appendChild(titleElem);
    task.appendChild(descElem);
    task.appendChild(editBtn);

    task.ondragstart = function () {
        draggedTask = task;
        task.classList.add('dragging');
    };
    task.ondragend = function () {
        draggedTask = null;
        task.classList.remove('dragging');
    };
    return task;
}

// Add task in catagory
function addTaskToCategory(task, category) {
    if (category === 'To Do') {
        todoList.appendChild(task);
    } else if (category === 'In Progress') {
        inProgress.appendChild(task);
    } else if (category === 'Done') {
        doneList.appendChild(task);
    }
}

// moving task
function moveTask(task, category) {
    task.remove();
    addTaskToCategory(task, category);
}

// function finding caagory
function findCategory(task) {
    if (todoList.contains(task)) return 'To Do';
    if (inProgress.contains(task)) return 'In Progress';
    if (doneList.contains(task)) return 'Done';
    return 'Select';
}

// Drag and Drop 
let allLists = document.querySelectorAll('.list');
allLists.forEach(list => {
    list.ondragover = function (e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
            list.appendChild(draggedTask);
        } else {
            list.insertBefore(draggedTask, afterElement);
        }
    };
    list.ondrop = function () {
        draggedTask = null;
    };
});

// function to insert task on position
function getDragAfterElement(list, y) {
    let tasks = [...list.querySelectorAll('.task:not(.dragging)')];
    return tasks.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Search Task
document.getElementById('search').onkeyup = function () {
    let searchValue = document.getElementById('search').value.toLowerCase();
    let tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
    let title = task.querySelector('.task-title').innerText.toLowerCase();
    let desc = task.querySelector('.task-desc').innerText.toLowerCase();
    if (title.includes(searchValue) || desc.includes(searchValue)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
};
// Input fields clear
function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
    option.value = 'Select';
}
