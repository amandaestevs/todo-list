import { projectsArray, saveNewProjects } from "./projects";

const savedTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks;
if (Array.isArray(savedTasks)) {
  tasks = savedTasks;
} else {
  tasks = [];
}


export function getCurrentProject() {
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = "";

  if(!document.querySelector(".active")) return document.getElementById('Inbox').classList.add('active');
  let currentProject = document.querySelector(".active");
  let currentName = currentProject.querySelector("a").textContent;

  setProjects()

  projectsArray.forEach((project) => {
    if (project.name === currentName) return displayTasks(project);
  });
}

import {taskEvents} from "./domEvents";
function displayTasks(project) {
  clear();
  let currentTasks = project.tasks;

  const todoContainer = document.querySelector(".todo-container");
  currentTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("todo");
    taskElement.innerHTML = `<input type="checkbox" id="${task.id}"  />
        <label for="${task.id}" class="todo-label">
          <div class="todo-title">${task.name}</div>
          <div class="todo-due-date">${task.date}</div>
        </label>
        <div class="todo-icons">
          <button class="see-more-btn">SEE MORE</button>
          <img src="icons/pen-to-square-solid.svg" class="edit-btn" />
          <img src="icons/trash-can-solid.svg" class="delete-btn" />
        </div>
      </div>`;

    checkColor(task, taskElement)
    checkBoxStatus(task, taskElement)
    todoContainer.append(taskElement);
    document.querySelectorAll('.todo').forEach(element => element.addEventListener('click', taskEvents))
  });
}

export const submitTodoBtn = document.querySelector(".submit-todo");
export function getTaskInfoFromFields() {
  if(!document.querySelector(".active")) return alert('Click on a project');
  
  const taskName = document.getElementById("task-name").value;
  const description = document.getElementById("description").value;
  let date = document.getElementById("due-date").value;
  const taskPriority = document.getElementById("priority").value;
  const id = new Date().toTimeString();

  createTask(taskName, description, date, taskPriority, id);
}

function createTask(taskName, description, date, taskPriority, id) {
  if (taskName.split(' ').length === taskName.length + 1 || taskName === '') return

  const formatedDate = formatDate(date);
  date = formatedDate;
  
  if(description.length === 0 || desciption === ""){
    description = 'No Description';
  }

  let newTask = task(taskName, description, date, taskPriority, id);
  tasks.push(newTask);
  saveTasks()

  taskManager(newTask);
}

function task(
  name,
  description = 'No Description',
  date,
  priority,
  id,
  checked = false
) {
  (name = name),
    (description = description),
    (date = date),
    (priority = priority),
    (id = id),
    (checked = checked);
  return { name, description, date, priority, id, checked };
}

function taskManager(task) {
  setProjects(task);
  getCurrentProject();
  closeForm();
}

function formatDate(dueDate) {
  if (dueDate === "") return "No Date";
  const dateToString = JSON.stringify(dueDate);

  const day = dateToString.slice(9, 11);
  const month = dateToString.slice(6, 8);
  const year = dateToString.slice(1, 5);
  const date = `${day}/${month}/${year}`;

  return date;
}

function setProjects(task) {
  addToInbox();
  checkProject(task);
  isItImportant();
  checkDate();
}

function addToInbox() {
  projectsArray.forEach((project) => {
    if (project.name != "Inbox") return;
    project.tasks = tasks;
  });
}

function checkProject(newTask) {
  let currentProject = document.querySelector(".active");
  let currentName = currentProject.querySelector("a").textContent;
  if (!currentProject.classList.contains("project")) return
  checkForDeletedTasks()
  saveNewProjects()
  if (!newTask) return
  projectsArray.forEach((project) => {
    if (project.name === currentName) {
      project.addTasks(newTask);
      saveNewProjects()
    }
  });
}

function checkForDeletedTasks(){
  let newProjectsArray = projectsArray.filter((project) => {
    if (project.name === 'Inbox' || project.name === 'Today' || project.name === 'This Week' || project.name === 'Important'){
      return false
    } else {
      return true
    }
  })

  newProjectsArray.forEach(project => {
    project.tasks.forEach((task, index) => {
      if(!tasks.includes(task)) return project.tasks.splice(index, 1)
    })
  })
}

function checkDate() {
  projectsArray.forEach((project) => {
    if (project.name === "Today" || project.name === "This Week") {
      const todayDate = new Date();
      const day = todayDate.getDate();
      const dd = day < 10 ? "0" + day : "" + day;

      const month = todayDate.getMonth() + 1;
      const mm = month < 10 ? "0" + month : "" + month;

      const year = todayDate.getFullYear();

      const today = `${dd}/${mm}/${year}`;
      isItToday(project, today);
      isItThisWeek(project, today);
    }
  });
}

function isItToday(project, today) {
  if (project.name != "Today") return;
  project.tasks.splice(0, project.tasks.length);
  tasks.forEach((task) => {
    if (task.date === today) return project.addTasks(task);
  });
}

function isItThisWeek(project, today) {
  if (project.name != "This Week") return;
  const inOneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  project.tasks.splice(0, project.tasks.length);

  tasks.forEach((task) => {
    const [day, month, year] = task.date.split("/");
    const taskDate = new Date(+year, +month - 1, +day);

    const [dd, mm, yyyy] = today.split("/");
    const now = new Date(+yyyy, +mm - 1, +dd);

    if (taskDate >= now && taskDate <= inOneWeek) return project.addTasks(task);
  });
}

function isItImportant() {
  projectsArray.forEach((project) => {
    if (project.name != "Important") return;
    project.tasks.splice(0, project.tasks.length);

    tasks.forEach((task) => {
      if (task.priority === "Important") return project.addTasks(task);
    });
  });
}

function checkColor(task, taskElement){
  if(task.priority === 'Important') return taskElement.style.background ='linear-gradient(to right, red 8px, white 0)';
  if(task.priority === 'Normal') return taskElement.style.background ='linear-gradient(to right, var(--blue) 8px, white 0)';
}

import { isFormOpen } from "./domEvents";
const closeForm = () => {
  if (!isFormOpen) return;
  const todoForm = document.querySelector(".todo-form");
  const editForm = document.querySelector(".edit-todo-form");

  isFormOpen = false;
  
  if(editForm.style.top ='50%') {
    editForm.style.top = '-100%';
  }
  if(todoForm.style.top ='50%'){
    todoForm.style.top = "-100%";
  }
};

function clear() {
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = "";

  document.getElementById("task-name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("due-date").value = "";

  document.getElementById("edit-name").value = "";
  document.getElementById("edit-description").value = "";
  document.getElementById("edit-due-date").value = "";
}

function saveTasks(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export function getTaskDetails(taskDiv) {
  const taskId = taskDiv.querySelector("input").id;
  tasks.forEach(task => {
    if (taskId != task.id) return
    document.querySelector(".see-more-todo-title").textContent = `${task.name}`;
    document.querySelector(
      ".see-more-todo-due-date"
    ).textContent = `${task.date}`;
    document.querySelector(
      ".see-more-todo-description"
    ).textContent = `${task.description}`;
    document.querySelector(
      ".see-more-todo-priority"
    ).textContent = `${task.priority}`;
  });
}

//editing and deleting
export function removeTask(taskDiv){
  const taskId = taskDiv.querySelector("input").id;
  tasks = tasks.filter(task => {
    if (taskId === task.id) return false
    if (taskId != task.id) return true
  })
  saveTasks()
  taskManager()
}

export function editTask(taskDiv){
    if (isFormOpen) return;
    const editForm = document.querySelector('.edit-todo-form');
    editForm.style.top = '50%';
    isFormOpen = true;

    const taskId = taskDiv.querySelector("input").id;
    tasks.forEach(task => {
      if(taskId === task.id) return getTaskInfo(task)
    })
}

function getTaskInfo(task){
  document.getElementById("edit-name").value = task.name;
  document.getElementById("edit-description").value = task.description;
  document.getElementById("edit-priority").value = task.priority;

  const taskDate = task.date;
  const formatedDate = formatTaskDate(taskDate);
  document.getElementById("edit-due-date").value = formatedDate;
  
  document.querySelector('.edit-todo').addEventListener('click', () => {
    editTaskInfo(task)
  }, {once: true})
}

function formatTaskDate(taskDate){
  if(taskDate === "") return 'No Date';

  const [dd, mm, yyyy] = taskDate.split('/');
  const formatedTaskDate = new Date(+yyyy, mm, +dd);
  const year = formatedTaskDate.getFullYear();
  const month = formatedTaskDate.getMonth() < 10 ? `0${formatedTaskDate.getMonth()}`: formatedTaskDate.getMonth();
  const day = formatedTaskDate.getDate() < 10 ? `0${formatedTaskDate.getDate()}`: formatedTaskDate.getDate();

  const formatedDate = [year, month, day].join('-');
  return formatedDate
}

export function editTaskInfo(task){
    if(task.name.split(' ').length === task.name.length + 1 || task.name === '') return 
    task.name = document.getElementById("edit-name").value;
  
    const dueDate = document.getElementById("edit-due-date").value;
    task.date = formatDate(dueDate);

    task.priority = document.getElementById("edit-priority").value;

    if(document.getElementById("edit-description").value === ""){
      task.description = 'No Description'
    } else {
      task.description = document.getElementById("edit-description").value;
    }
  
    saveTasks()
    taskManager()
}

//checkbox
export function taskCheckBox(e){
  const checkBox = e.target;
  const taskId = checkBox.id;

  let boxValue;
  if(checkBox.checked === true){
    boxValue = true;
 } else {
    boxValue = false;
 }

  tasks.forEach(task => {
    if(task.id === taskId){
        task.checked = boxValue;

       console.log(tasks)
       applyCheckBoxStyle(task, checkBox)
       saveTasks()
    }
  })  
}

function applyCheckBoxStyle(task, checkBox){
   const todo = checkBox.closest('.todo');
   const todoTitle = todo.querySelector('.todo-title');
    
   if(task.checked){
    todoTitle.classList.add('task-checked');
    checkBox.checked = true;
   }
   if(!task.checked){
     checkBox.checked = false;
     if(todoTitle.classList.contains('task-checked')) return todoTitle.classList.remove('task-checked');
   }
  
}

function checkBoxStatus(task, todoElement){
  const checkBox = todoElement.querySelector('input');
  applyCheckBoxStyle(task, checkBox)
}

//search bar

const visibleTasks = []
export function searchBar(e){
  const value = e.target.value.toLowerCase()
  
  visibleTasks.splice(0, visibleTasks.length)

  let currentProject = document.querySelector(".active");
  let currentName = currentProject.querySelector("a").textContent;

  projectsArray.forEach((project) => {
    if (project.name === currentName) return searchForTasks(project, value)
  })
}

function searchForTasks(project, value){
     project.tasks.forEach(task => {
       if(task.name.toLowerCase().includes(value)){
        visibleTasks.push(task)
        searchForTaskElement(value)
       }
     })
}

function searchForTaskElement(value){
  const todoElements = document.querySelectorAll('.todo');

  todoElements.forEach(element => {
    const elementId = element.querySelector('input').id;
    tasks.forEach(task => {
      if(task.id != elementId) return 
   
      if(!visibleTasks.includes(task)) return element.style.display = 'none';
      if(visibleTasks.includes(task)) return element.style.display = 'grid';
    })
  })

    if (value === "") {
      todoElements.forEach(element => {
        element.style.display = 'grid';
      })
    }
}