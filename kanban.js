// Get elements
let addBtn = document.getElementById('add');
let addTaskBtn = document.getElementById('addTask');
let modale = document.getElementById('modale');
let option = document.getElementById('select');
let todolist = document.getElementById('todoList');
let inProgress = document.getElementById('inProgress');
let doneList = document.getElementById('done');
let editTaskElement = null;

// Show modal for adding/editing task
addBtn.addEventListener('click', () => {
    modale.classList.add('show');
    editTaskElement = null;
    resetFields();
});

// Add or edit task
    addTaskBtn.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if (title.trim() === "" || desc.trim() === "" || option.selectedIndex === 0) {
        alert("Please fill in all fields and select an option.");
        return;
    }
    if (editTaskElement) {
        updateTask(editTaskElement, title, desc, option.value);
    } else {
        let taskElement = createTaskElement(title, desc, option.value);
        appendTaskToCategory(taskElement, option.value);
    }
    modale.classList.remove('show');
    resetFields();
});

// Create task element
    function createTaskElement(title, desc, category) {
    let task = document.createElement('li');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.innerHTML = `
        <p class="task-title">${title}</p>
        <p class="task-desc">${desc}</p>
        <button class="edit-btn">Edit</button>
    `;
    task.querySelector('.edit-btn').addEventListener('click', () => {
        editTaskElement = task;
        document.getElementById('title').value = title;
        document.getElementById('desc').value = desc;
        option.value = category;
        modale.classList.add('show');
        console.log("hello");        
    });
    addDragEventsToTask(task);
    return task;
}

// Update task
function updateTask(task, title, desc, category) {
    task.querySelector('.task-title').textContent = title;
    task.querySelector('.task-desc').textContent = desc;
    let previousCategory = task.getAttribute('data-type');
    task.setAttribute('data-type', category);
    if (previousCategory !== category) {
        task.remove();
        appendTaskToCategory(task, category);
    }
}

// Append task to category
function appendTaskToCategory(task, category) {
    if (category === "To Do") {
        todolist.appendChild(task);
    } else if (category === "In Progress") {
        inProgress.appendChild(task);
    } else if (category === "Done") {
        doneList.appendChild(task);
    }
}

// Reset input fields
function resetFields() {
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    option.selectedIndex = 0;
}

// Add drag events to task
function addDragEventsToTask(task) {
    task.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.outerHTML);
        task.classList.add('dragging');
    });
    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
}

// Drag and drop functionality
document.querySelectorAll('.list').forEach(list => {
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        let taskHTML = e.dataTransfer.getData('text/plain');
        let taskElement = document.createElement('div');
        taskElement.innerHTML = taskHTML;
        let task = taskElement.firstChild;
        list.appendChild(task);
        document.querySelector('.dragging').remove();
        addDragEventsToTask(task);
    });
});

// Initialize drag events for existing tasks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.task').forEach(task => {
        task.setAttribute('draggable', 'true');
        addDragEventsToTask(task);
    });
});

//         Search

let search = document.getElementById('search');
search.addEventListener('keyup', () => {
    let searchValue = search.value.toLowerCase();
    document.querySelectorAll('li').forEach(item => {
        let itemTitle = item.textContent.toLowerCase();
        item.style.display = itemTitle.includes(searchValue) ? '' : 'none';
    });
});
