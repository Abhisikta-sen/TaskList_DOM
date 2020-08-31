//define UI variable
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// function call to load all event listners
loadEventListeners();

// func to load all event listners
function loadEventListeners(){
//--- ----------3.DOM Load event---------------------
document.addEventListener('DOMContentLoaded', getTasks);
//add task event
form.addEventListener("submit", addTask);
//remove task event
taskList.addEventListener("click", removeTask);
//clear all task event
clearBtn.addEventListener("click", clearAllTask);
//filter task
filter.addEventListener("keyup", filterTask);

}


//--- -----------4.get tasks from local storage-------------------
function getTasks(){
    let task_item;
    if(localStorage.getItem('task_item') === null){
        task_item = [];
    }else {
        task_item = JSON.parse(localStorage.getItem('task_item'));
    }

    task_item.forEach(function(task){
            //create li element
            const lis = document.createElement("li");
            //add class
            lis.className = "Collection-item";
            //create text node and append to the li
            lis.appendChild(document.createTextNode(task));
            // create new link element
            const link = document.createElement("a");
            //add class
            link.className = "delete-item secondary-content";// as weneed it to the right hence using secondary-content
            // add icon html
            link.innerHTML = "<i class='fa fa-remove'></i>"
            //append the link to li
            lis.appendChild(link);
            //append the li to ul
            taskList.appendChild(lis);
    });
}

//Add tasks
function addTask(e){
    if(taskInput.value === ''){
        alert("Add a task...");
    }
    //create li element
    const lis = document.createElement("li");
    //add class
    lis.className = "Collection-item";
    //create text node and append to the li
    lis.appendChild(document.createTextNode(taskInput.value));
    
    console.log(taskInput.value);
    // create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";// as weneed it to the right hence using secondary-content
    // add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>"
    //append the link to li
    lis.appendChild(link);
    //append the li to ul
    taskList.appendChild(lis);

    //--- --------1.Store in local storage--------------------
        storeTaskInLocalStorage(taskInput.value);
    //storage end above

    //clear input
    taskInput.value ='';

    //console.log(lis);
    e.preventDefault();
}

//--- ---------2.store task in local storage----------------
function storeTaskInLocalStorage(task){
    let task_item;
    if(localStorage.getItem('task_item') === null){
        task_item = [];
    }else {
        task_item = JSON.parse(localStorage.getItem('task_item'));
    }
    task_item.push(task);
   // console.log(task_item);
    localStorage.setItem("task_item", JSON.stringify(task_item));
}

//Remove each task
function removeTask(eve){

    if(eve.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            const rem = eve.target.parentElement.parentElement;
            rem.remove();
        // console.log(eve.target);
        // console.log(rem);
        //--- -----------5.remove tasks from local storage---------------
        removeTaskFromLocalStorage(rem);
        }
    }
}
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);
    let task_item;
    if(localStorage.getItem('task_item') === null){
        task_item = [];
    }else {
        task_item = JSON.parse(localStorage.getItem('task_item'));
    }
    task_item.forEach(function(task, index){
        if(taskItem.textContent === task){
            task_item.splice(index,1);
        }
    });
    localStorage.setItem("task_item", JSON.stringify(task_item));
}

//clear all tasks
function clearAllTask(){
   taskList.innerHTML='';

//  //faster way
//  while(taskList.firstChild){
//      taskList.removeChild(taskList.firstChild);
//  }
// https://jsperf.com/innerhtml-vs-removechild

//clear tasks from local storage
clearTasksFromLS();
}
function clearTasksFromLS(){
    localStorage.clear();
}

//filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
   // console.log(text);
    // querySelector returns node list where we can use forEach directly, getElementByClass will return HTML collection 
    //  which we need to convert to arraay to use forEach
    document.querySelectorAll(".Collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        //console.log(item);
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
          } else {
            task.style.display = 'none';
          }
    });
}


