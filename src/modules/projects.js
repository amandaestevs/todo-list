export const submitProjectBtn = document.querySelector(".submit-project");
import {getCurrentProject} from './todos'

let homeTabs = []
const inbox = document.getElementById('inbox');
const today = document.getElementById('today');
const thisWeek = document.getElementById('this-week');
const important = document.getElementById('important');
homeTabs.push(inbox, today, thisWeek, important);

export let projectsArray = []

homeTabs.map(project => {
    const projectName = project.querySelector('a').textContent;
    let newProject = setProperties(projectName);
    projectsArray.push(newProject);
    return {newProject}
  })

window.addEventListener('load', renderProjects)  
  
function setProperties(name, tasks = []){
   const addTasks = (newTask) => {
    tasks.push(newTask)
   }
    return {name, tasks, addTasks}
}

export let newProjectsArray; 
const savedNewProjects = JSON.parse(localStorage.getItem('new-projects'));
if (Array.isArray(savedNewProjects)) {
  newProjectsArray = savedNewProjects.map(project => {
    let name = project.name;
    let tasks = project.tasks;
    let id = project.id;
    let newProject = reassignProject(name, id, tasks)
     
    projectsArray.push(newProject)
    return newProject 
  })
} else {
  newProjectsArray = [];
}

function reassignProject(name, id, tasks = []){
  const addTasks = (newTask) => {
   tasks.push(newTask)
  }

  return {name, id, tasks, addTasks}
}

export function createProject() {
  const projectName = document.querySelector("#project-name").value;
  validateProject(projectName);
}

function validateProject(name) {
  if (name.split(' ').length === name.length + 1 || name === '') return 
  const id = new Date().toTimeString();
  let newProject = project(name, id);
  newProjectsArray.push(newProject);
  projectsArray.push(newProject);
  saveNewProjects()
  renderProjects();
}

function project(name, id, tasks = []){
   const addTasks = (newTask) => {
    tasks.push(newTask)
   }

   return {name, id, tasks, addTasks}
}

import { handleTabClick } from "./domEvents";
const projectsContainer = document.querySelector(".projects");
function renderProjects() {
   clear()

  newProjectsArray.forEach((project) => {
    const projectElem = document.createElement("li");
    projectElem.classList.add("project", "tab");
    projectElem.innerHTML = `<a>${project.name}</a><img src="icons/kebab-menu.svg" class="kebab-menu"/>
    <div class="projects-btn" id="${project.id}">
      <div class="delete-project">Delete</div>
      <div class="edit-project">Edit</div>
    </div>`;
     
    projectElem.addEventListener('click', handleTabClick)
    projectElem.addEventListener('click', projectEvents)
    projectsContainer.append(projectElem);
  });
  closeForm();
  getCurrentProject()
}

const clear = () => {
  projectsContainer.innerHTML = ""; 

  const nameField = document.querySelector('#project-name');
  nameField.value = "";

  const editField = document.querySelector('#edit-project-name');
  editField.value = "";
}

import { isFormOpen } from "./domEvents";
const closeForm = () => {
   const projectForm = document.querySelector('.project-form');
   const editProjectForm = document.querySelector('.edit-project-form');
   isFormOpen = false;

   if(projectForm.style.top === '50%'){
    projectForm.style.top = "-100%";
   }

   if(editProjectForm.style.top === '50%'){
    editProjectForm.style.top = '-100%'
   }
}

export function saveNewProjects(){
  localStorage.setItem('new-projects', JSON.stringify(newProjectsArray))
}

function projectEvents(e){
  if(e.target.classList.contains('kebab-menu')) return openMenu(e)
  if(e.target.classList.contains('delete-project')) return removeProject(e)
  if(e.target.classList.contains('edit-project')) return editProject(e)
}

function openMenu(e){
   if (!e.target.classList.contains('kebab-menu')) return 
   let projectContainer = e.target.closest('.project')
   let btns = projectContainer.querySelector('.projects-btn')
   btns.classList.add('show-menu');
   setTimeout(closeMenu, 100)
   return
}

function closeMenu(){
  if(document.querySelectorAll('.show-menu').length === 0) return
  window.addEventListener('click', ()=> { 
    document.querySelectorAll('.show-menu').forEach(menu => menu.classList.remove('show-menu'))
  }, {once: true})
}

function removeProject(e){
  const projectId = e.target.closest('.projects-btn').getAttribute('id');
  newProjectsArray = newProjectsArray.filter(project => {
    if (project.id === projectId) return false
    if (project.id != projectId) return true
  })
  saveNewProjects()
  renderProjects()
}

function editProject(e){
  const projectId = e.target.closest('.projects-btn').getAttribute('id');

  if(isFormOpen) return
  document.querySelector('.edit-project-form').style.top = '50%';

  newProjectsArray.forEach(project => {
    if(project.id != projectId) return 
    if(project.id === projectId) return editProjectInfo(project)
  })
}

export function editProjectInfo(project){
  document.querySelector('#edit-project-name').value = project.name;
  const name = document.querySelector('#edit-project-name').value;
  if (name.split(' ').length === name.length + 1 || name === '') return 
 
  document.querySelector('.submit-edit-project').addEventListener('click', () => {
    project.name = document.querySelector('#edit-project-name').value;
    saveNewProjects()
    renderProjects()
  }, {once: true})
}