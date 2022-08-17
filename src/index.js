import { addTaskBtn, addProjectBtn, openForm, close, closeBtn, seeMoreBtn, openSeeMore} from "./modules/domEvents";
import { kebabMenu, handleMenu } from "./modules/domEvents";
import { submitProjectBtn, createProject } from "./modules/projects"

addTaskBtn.addEventListener('click', openForm)
addProjectBtn.addEventListener('click', openForm)
closeBtn.forEach(btn => btn.addEventListener('click', close))
seeMoreBtn.forEach(btn => btn.addEventListener('click', openSeeMore))
kebabMenu.forEach(btn => btn.addEventListener('click', handleMenu))
submitProjectBtn.addEventListener('click', createProject)
