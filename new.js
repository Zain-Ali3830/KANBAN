let addBtn=document.getElementById('add');
let addTaskBtn=document.getElementById('addTask')
let modale=document.getElementById('modale')
let option=document.getElementById('select')
let todolist=document.getElementById('todoList')
let inProgress=document.getElementById('inProgress')
let Done=document.getElementById('done')
let mainArray=[];
let todo;
let inP;
let don;
let toDoArray=[];
let inPArray=[];
let doneArray=[];





addBtn.addEventListener('click',()=>{
    modale.classList.add('show');
})

//  Adding values in ToDo
addTaskBtn.addEventListener('click',()=>{
    let title=document.getElementById('title');
    let desc=document.getElementById('desc')


//          Creating Object
    let obj={
        tit:title.value,
        des:desc.value,
       }
       console.log(obj);
       mainArray.push(obj)
       console.log(obj);

    // Checking condition
    if(option.selectedIndex===0){
        alert("Please Select the option")
        return
    }

    //  Adding value in To do
    if(option.value==="To Do"){
        todo=document.createElement('li')
       todo.classList.add('todo')
       todo.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
       let toDoObj={
        todoTit:title.value,
        toDoDesc:desc.value,
       }
       toDoArray.push(toDoObj)
       console.log("To do array is",toDoArray)
       title.value=""
       desc.value="";
       option.selectedIndex=0;
       todolist.append(todo)
       modale.classList.remove('show')
    }

// Adding value in In Progress
     if(option.value==="In Progress"){
        inP =document.createElement('li')
        inP.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
        let inPObj={
            inPTit:title.value,
            inPDesc:desc.value,
        }
        inPArray.push(inPObj);
        console.log("InP array is",inPArray)
        inP.classList.add('todo');
        title.value=""
        desc.value="";
        option.selectedIndex=0;
        inProgress.append(inP)
        modale.classList.remove('show')
     }

     // Adding value in Done
     if(option.value==="Done"){
         don =document.createElement('li')
        don.innerHTML=`<p>${title.value}</p><p> ${desc.value}</p> `
        let doneObj={
            doneTit:title.value,
            doneDesc:desc.value,
        }
        doneArray.push(doneObj);
        don.classList.add('todo')
        title.value=""
        desc.value="";
        option.selectedIndex=0;
        Done.append(don)
        modale.classList.remove('show')
     }
})


let search=document.getElementById('search')
    //    console.log(search);
        let result = null;
        search.addEventListener('keyup', () => {
        mainArray.forEach(item => {
            if (item.tit.toLowerCase() !== search.value.toLowerCase()) {
            todo.remove();
            inP.remove();
            don.remove();
         result = item; // Store the matched item
                }
                return result;
            });
        });
       
    