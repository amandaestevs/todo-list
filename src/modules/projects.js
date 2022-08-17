export const submitProjectBtn = document.querySelector(".submit-project");

export function createProject() {
  const projectName = document.querySelector("#project-name").value;
  validateProject(projectName);
}

function validateProject(name) {
  if (name.length === 0) return 
  let newProject = new Project(name);
  projectsArray.push(newProject);
  renderProjects();
}

const projectsArray = [];
class Project {
  constructor(name, tasks = "No Tasks") {
    this.name = name;
    this.tasks = tasks;
  }
}

import { handleTabClick } from "./domEvents";
const projectsContainer = document.querySelector(".projects");
function renderProjects() {
   clear()

  projectsArray.forEach((project) => {
    const projectElem = document.createElement("li");
    projectElem.classList.add("project", "tab");
    projectElem.innerHTML = `<a>${project.name}</a><img src="icons/kebab-menu.svg" class="kebab-menu"/>
    <div class="action-btn">
      <div class="edit-btn">Edit</div>
      <div class="delete-btn">Delete</div>
    </div>`;
     
    projectElem.addEventListener('click', handleTabClick)
    projectsContainer.append(projectElem);
  });
  closeForm();
}

const clear = () => {
  projectsContainer.innerHTML = ""; 

  const nameField = document.querySelector('#project-name');
  nameField.value = "";
}

import { isFormOpen } from "./domEvents";
const closeForm = () => {
   const projectForm = document.querySelector('.project-form');
   isFormOpen = false;
   return projectForm.style.top = "-100%";
}