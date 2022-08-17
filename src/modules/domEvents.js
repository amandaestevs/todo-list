export const addTaskBtn = document.querySelector(".addTodoBtn");
export const addProjectBtn = document.querySelector(".add-project");
export const seeMoreBtn = document.querySelectorAll(".see-more-btn");
const todoForm = document.querySelector(".todo-form");
const projectForm = document.querySelector(".project-form");
const seeMoreTask = document.querySelector(".see-more");

let isFormOpen = false;
export function openForm(event) {
  if (isFormOpen) return;
  if (addTaskBtn === event.currentTarget) return todoForm.style.top = "50%";
  if (addProjectBtn === event.currentTarget) return projectForm .style.top = "50%";
  isFormOpen = true;
}

export function openSeeMore(){
  if (isFormOpen) return
    seeMoreTask.style.top = "50%";
}

export const closeBtn = document.querySelectorAll(".close-btn");
export function close(event) {
    if (todoForm === event.currentTarget.parentNode.parentNode) return todoForm.style.top = "-100%";
    if (projectForm === event.currentTarget.parentNode.parentNode) return projectForm.style.top = "-100%";
    if (seeMoreTask === event.currentTarget.parentNode.parentNode) return seeMoreTask.style.top = "-100%";
    
    return isFormOpen = false;
}

export const kebabMenu = document.querySelectorAll('.kebab-menu');
const menu = document.querySelector('.edit-delete');
export function handleMenu(){
    menu.classList.toggle('show-menu');
}
