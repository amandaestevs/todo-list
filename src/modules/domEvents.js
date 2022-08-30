const addTaskBtn = document.querySelector(".addTodoBtn");
const addProjectBtn = document.querySelector(".add-project");
const seeMoreBtn = document.querySelectorAll(".see-more-btn");
const todoForm = document.querySelector(".todo-form");
const projectForm = document.querySelector(".project-form");
const seeMoreTask = document.querySelector(".see-more");
const editForm = document.querySelector('.edit-todo-form');
const editProjectForm = document.querySelector('.edit-project-form');
const searchBarElement = document.querySelector('.search-bar');

import { submitProjectBtn, createProject } from "./projects";
import { submitTodoBtn, getTaskInfoFromFields, getTaskDetails, searchBar } from "./todos";

export default function eventListeners () {
  window.addEventListener('load', getCurrentProject);
  addTaskBtn.addEventListener("click", openForm);
  addProjectBtn.addEventListener("click", openForm);
  closeBtn.forEach((btn) => btn.addEventListener("click", close));
  seeMoreBtn.forEach((btn) => btn.addEventListener("click", openSeeMore));
  submitTodoBtn.addEventListener('click', getTaskInfoFromFields);
  submitProjectBtn.addEventListener("click", createProject);
  searchBarElement.addEventListener('input', searchBar);
}

export let isFormOpen = false;
function openForm(event) {
  if (isFormOpen) return;
  isFormOpen = true;
  document.addEventListener('keypress', checkForKeyPress)
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
  if (editForm === event.currentTarget.parentNode.parentNode)
    return (editForm.style.top = "-100%");
  if (editProjectForm === event.currentTarget.parentNode.parentNode)
    return (editProjectForm.style.top = "-100%");
}

function checkForKeyPress(e){
  if (projectForm.style.top === "50%" && e.key === "Enter") return createProject() 
  if (todoForm.style.top === "50%" && e.key === "Enter") return getTaskInfoFromFields() 
}

function openSeeMore(parentTodo) {
  if (isFormOpen) return;
  isFormOpen = true;
  getTaskDetails(parentTodo)
  seeMoreTask.style.top = "50%";
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => tab.addEventListener('click', handleTabClick))

import { getCurrentProject } from "./todos"
 export function handleTabClick(event){
  if (document.querySelectorAll('.active').length != 0) {
    document.getElementsByClassName('active')[0].classList.remove('active');
  } 
  
  let currentTab = event.currentTarget;
  currentTab.classList.add('active');
  getCurrentProject()
}

import {removeTask, editTask, taskCheckBox} from './todos'
export function taskEvents(e){
    const clickedElement = e.target;
    const parentTodo = clickedElement.closest('.todo');

    if (clickedElement.classList.contains('see-more-btn')) return openSeeMore(parentTodo)
    if (clickedElement.classList.contains('delete-btn')) return removeTask(parentTodo)
    if (clickedElement.classList.contains('edit-btn')) return editTask(parentTodo)
    parentTodo.querySelector('input').addEventListener('change', taskCheckBox) 
}