const addTaskBtn = document.querySelector(".addTodoBtn");
const addProjectBtn = document.querySelector(".add-project");
const seeMoreBtn = document.querySelectorAll(".see-more-btn");
const todoForm = document.querySelector(".todo-form");
const projectForm = document.querySelector(".project-form");
const seeMoreTask = document.querySelector(".see-more");

import { submitProjectBtn, createProject } from "./projects";

export default function eventListeners () {
  addTaskBtn.addEventListener("click", openForm);
  addProjectBtn.addEventListener("click", openForm);
  closeBtn.forEach((btn) => btn.addEventListener("click", close));
  seeMoreBtn.forEach((btn) => btn.addEventListener("click", openSeeMore));
  kebabMenu.forEach((btn) => btn.addEventListener("click", handleMenu));
  submitProjectBtn.addEventListener("click", createProject);
}

export let isFormOpen = false;
function openForm(event) {
  if (isFormOpen) return;
  isFormOpen = true;
  if (addTaskBtn === event.currentTarget) return (todoForm.style.top = "50%");
  if (addProjectBtn === event.currentTarget)
    return (projectForm.style.top = "50%");
}

const closeBtn = document.querySelectorAll(".close-btn");
function close(event) {
  isFormOpen = false;
  if (todoForm === event.currentTarget.parentNode.parentNode)
    return (todoForm.style.top = "-100%");
  if (projectForm === event.currentTarget.parentNode.parentNode)
    return (projectForm.style.top = "-100%");
  if (seeMoreTask === event.currentTarget.parentNode.parentNode)
    return (seeMoreTask.style.top = "-100%");
}

const kebabMenu = document.querySelectorAll(".kebab-menu");
const menu = document.querySelector(".action-btn");
function handleMenu() {
  menu.classList.toggle("show-menu");
}


function openSeeMore() {
  if (isFormOpen) return;
  isFormOpen = true;
  seeMoreTask.style.top = "50%";
}

//user changes tab 

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => tab.addEventListener('click', handleTabClick))

import { renderTasks } from "./todos"
 export function handleTabClick(event){
  if (document.querySelectorAll('.active').length != 0) {
    document.getElementsByClassName('active')[0].classList.remove('active');
  } 
  
  let currentTab = event.currentTarget;
  currentTab.classList.add('active');
  renderTasks()
}

//delete and edit buttons
