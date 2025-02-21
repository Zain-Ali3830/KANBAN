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
    mainArray.push(obj);
    console.log(obj);

    // Checking condition
    if (option.selectedIndex === 0) {
        alert("Please Select the option");
        return;
    }

    // Adding value in To do
    if (option.value === "To Do") {
        todo = document.createElement('li');
        todo.classList.add('todo');
        todo.innerHTML = `<p>${title.value}</p><p>${desc.value}</p>`;
        todo.setAttribute('data-type', 'todo');
        todolist.append(todo);
        modale.classList.remove('show');
    }

    // Adding value in In Progress
    if (option.value === "In Progress") {
        inP = document.createElement('li');
        inP.innerHTML = `<p>${title.value}</p><p>${desc.value}</p>`;
        inP.classList.add('todo');
        inP.setAttribute('data-type', 'in-progress');
        inProgress.append(inP);
        modale.classList.remove('show');
    }

    // Adding value in Done
    if (option.value === "Done") {
        don = document.createElement('li');
        don.innerHTML = `<p>${title.value}</p><p>${desc.value}</p>`;
        don.classList.add('todo');
        don.setAttribute('data-type', 'done');
        Done.append(don);
        modale.classList.remove('show');
    }

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
    if (itemTitle.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
