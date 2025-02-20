let addBtn=document.getElementById('add');
let addTaskBtn=document.getElementById('addTask')
let modale=document.getElementById('modale')
let option=document.getElementById('select')
let todolist=document.getElementById('todoList')
let inProgress=document.getElementById('inProgress')
let Done=document.getElementById('done')
let toDoArray=[];
addBtn.addEventListener('click',()=>{
    modale.classList.add('show');
})

//  Adding values in ToDo
addTaskBtn.addEventListener('click',()=>{
    let title=document.getElementById('title');
    let desc=document.getElementById('desc')
    
    // Checking condition
    if(option.selectedIndex===0){
        alert("Please Select the option")
        return
    }

    //  Adding value in To do
    if(option.value==="To Do"){
       let todo=document.createElement('li')
       todo.classList.add('todo')
       todo.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
       title.value=""
       desc.value="";
       option.selectedIndex=0;
       toDoArray.push(todo);
       console.log(toDoArray)
       todolist.append(todo)
       modale.classList.remove('show')
    }

// Adding value in In Progress
     if(option.value==="In Progress"){
        let inP =document.createElement('li')
        inP.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
        inP.classList.add('todo');
        title.value=""
        desc.value="";
        option.selectedIndex=0;
        inProgress.append(inP)
        modale.classList.remove('show')
     }

     // Adding value in Done
     if(option.value==="Done"){
        let don =document.createElement('li')
        don.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
        don.classList.add('todo')
        title.value=""
        desc.value="";
        option.selectedIndex=0;
        Done.append(don)
        modale.classList.remove('show')
     }
})


