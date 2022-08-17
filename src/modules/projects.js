import { validate } from "schema-utils";

export const submitProjectBtn = document.querySelector('.submit-project');

class Tab {
    constructor(name, todos){
        this.name = name;
        todos = []
    }
} 

class Projects extends Tab {
    constructor(themeColor){
        this.themeColor = themeColor
    }
}

export function createProject(){
    const projectNameInput = document.querySelector('#Project-name');
    const projectName = projectNameInput.value;

    const colorPicker = document.querySelector('.color-picker');
    const colors = colorPicker.querySelectorAll('.color');
    colors.forEach(color => color.addEventListener('click', validateColor))

    
}
 
let color
function validateColor(event){
   const colorIndex = event.currentTarget.index;
   switch(colorIndex) {
    case 0: color = 'blue';
    alert('ok')
   }
}