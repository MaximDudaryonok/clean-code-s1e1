//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.querySelector(".task-section__input");//Add a new task.
const addButton=document.querySelector(".task-section__button");//first button
const incompleteTaskHolder=document.querySelector(".task-list_incomplete");//ul of #incomplete-tasks
const completedTasksHolder=document.querySelector(".task-list_completed");//completed-tasks


//New task list item
const createNewTaskElement=function(taskString){

  const listItem=document.createElement("li");

  //input (checkbox)
  const checkBox=document.createElement("input");//checkbx
  //label
  const label=document.createElement("label");//label
  //input (text)
  const editInput=document.createElement("input");//text
  //button.edit
  const editButton=document.createElement("button");//edit button

  //button.delete
  const deleteButton=document.createElement("button");//delete button
  const deleteButtonImg=document.createElement("img");//delete button image

  label.innerText=taskString;
  label.className="task-list__label task-list__label_size";

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className = "task-list__input task-list__input_checkbox";
  editInput.type="text";
  editInput.className="task-list__input task-list__input_size task-list__input_text";

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="task-list__button task-list__button_edit";

  deleteButton.className="task-list__button task-list__button_delete";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.className="task-list__button-img"
  deleteButtonImg.alt = "delete todo button";
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.className = "task-list__item";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

const editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  const listItem=this.parentNode;
  const editInput=listItem.querySelector(".task-list__input_text");
  const label=listItem.querySelector(".task-list__label");
  editInput.classList.add('task-list__input_size');
  label.classList.add('task-list__label_size');
  const editBtn=listItem.querySelector(".task-list__button_edit");
  const containsClass=listItem.classList.contains("task-list__item_edit");
  //If class of the parent is .task-list__item--edit
  if(containsClass){

    //switch to .task-list__item--edit
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";

  }
  //toggle .task-list__item--edit on the parent.
  listItem.classList.toggle("task-list__item_edit");
  editInput.classList.toggle('task-list__input_edit');
  label.classList.toggle('task-list__label_edit');
};


//Delete task.
const deleteTask=function(){
  console.log("Delete Task...");

  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  listItem.classList.add('task-list__item_completed');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  const listItem=this.parentNode;
  listItem.classList.remove('task-list__item_completed');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  const checkBox=taskListItem.querySelector(".task-list__input_checkbox");
  const editButton=taskListItem.querySelector(".task-list__button_edit");
  const deleteButton=taskListItem.querySelector(".task-list__button_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.