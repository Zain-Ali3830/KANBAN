let addBtn = document.getElementById('add');
let addTaskBtn = document.getElementById('addTask');
let modale = document.getElementById('modale');
let option = document.getElementById('select');
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
    }

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
