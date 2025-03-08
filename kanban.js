<<<<<<< HEAD
=======
// Important Elements ko get kar rahe hain
>>>>>>> a17c94995cae1cfcbc3f7cb8d57f13110d392914
let addBtn = document.getElementById('add');
let addTaskBtn = document.getElementById('addTask');
let modale = document.getElementById('modale');
let option = document.getElementById('select');
<<<<<<< HEAD
let todolist = document.getElementById('todoList');
let inProgress = document.getElementById('inProgress');
let Done = document.getElementById('done');
let mainArray = [];
let todo, inP, don;

addBtn.addEventListener('click', () => {
    modale.classList.add('show');
});

// Adding values in ToDo
addTaskBtn.addEventListener('click', () => {
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');

    // Creating Object
    let obj = {
        tit: title.value,
        des: desc.value,
    };
    console.log(obj);
    mainArray.unshift(obj);
    console.log(mainArray)


    // Checking condition
    if (option.selectedIndex === 0) {
        alert("Please Select the option");
        return;
    }

                    // Create Element
    function createTaskElement(title, desc, type) {
        let task = document.createElement('li');
        task.draggable = true;
        task.classList.add('todo');
        task.innerHTML = `<p>${title}</p><p>${desc}</p>`;
        task.setAttribute('data-type', type);
        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.outerHTML);
            task.classList.add('dragging');
        });
        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });
        return task;
    }
    let taskElement = createTaskElement(title.value, desc.value, option.value);

                    // Adding  task to the selected category
    if (option.value === "To Do") {
        todolist.appendChild(taskElement);
    } else if (option.value === "In Progress") {
        inProgress.appendChild(taskElement);
    } else if (option.value === "Done") {
        Done.appendChild(taskElement);
=======
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
>>>>>>> a17c94995cae1cfcbc3f7cb8d57f13110d392914
    }
    modale.classList.remove('show');
    clearInputs();
};

<<<<<<< HEAD
    modale.classList.remove('show');

    // Reset input fields
    title.value = "";
    desc.value = "";
    option.selectedIndex = 0;
});

// Search Functionality
let search = document.getElementById('search');
search.addEventListener('keyup', () => {
    let searchValue = search.value.toLowerCase();
    document.querySelectorAll('li').forEach(item => {
        let itemTitle = item.textContent.toLowerCase();
        item.style.display = itemTitle.includes(searchValue) ? '' : 'none';
    });
});

// Drag and Drop Functionality
document.querySelectorAll('.list').forEach(list => {
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        let taskHTML = e.dataTransfer.getData('text/plain');
        list.innerHTML += taskHTML;
        document.querySelectorAll('.dragging').forEach(task => task.remove());
        addDragEvents();
    });
});

// Function to add drag events after dropping
function addDragEvents() {
    document.querySelectorAll('li').forEach(task => {
        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.outerHTML);
            task.classList.add('dragging');
        });
        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });
    });
}

addDragEvents();
=======
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
>>>>>>> a17c94995cae1cfcbc3f7cb8d57f13110d392914
