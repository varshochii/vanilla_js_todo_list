'use strict';

//select all DOM elements
const headerTime = document.querySelector('[data-header-time]');
const menuTogglers = document.querySelectorAll('[data-menu-toggler]');
const menu = document.querySelector('[data-menu]');
const themeBtns = document.querySelectorAll('[data-theme-btn]');
const modalTogglers = document.querySelectorAll('[data-modal-toggler]');
const welcomeNote = document.querySelector('[data-welcome-note]');
const taskList = document.querySelector('[data-task-list]');
const taskInput = document.querySelector('[data-task-input]');
const modal = document.querySelector('[data-info-modal]');
let taskItem = {};
let taskRemover = {};


// store current data from build-in date object
const date = new Date();


//import task complete sound
const taskCompleteSound = new Audio("./assets/sounds/task-complete.mp3");


// conver weekday number to weekday name 
// totalparameter: 1
// parameterValue: <number> 0-6;

const getWeekDayName = (dayNumber) => {
   
      switch(dayNumber){

         case 0: 
            return 'Sunday';
            break;

         case 1: 
            return 'Monday';
            break;

         case 2: 
            return 'Tuesday';
            break;

         case 3: 
            return 'Wednesday';
            break;

         case 4: 
            return 'Thursday';
            break;

         case 5: 
            return 'Friday';
            break;

         case 6: 
            return 'Satureday';
            break;

            default:
                return 'Not a valid day'
      }
}



// conver months number to month name 
// totalparameter: 1
// parameterValue: <number> 0-11;

const getMonthName = (MonthName) => {
 
     switch(MonthName){

         case 0:
            return 'Jan';
            break;

         case 1:
            return 'Feb';
            break;

         case 2:
            return 'Mar';
            break;

         case 3:
            return 'Apr';
            break;

         case 4:
            return 'May';
            break;

         case 5:
            return 'Jun';
            break;

         case 6:
            return 'Jul';
            break;

         case 7:
            return 'Aug';
            break;

         case 8:
            return 'Sep';
            break;

         case 9:
            return 'Oct';
            break;

         case 10:
            return 'Nov';
            break;

         case 11:
            return 'Dec';
            break;

            default:
                return 'Not a Valid month';
     }
}


//// store weekday name, month day, & month of day number
const weekDayName = getWeekDayName(date.getDay());
const monthName = getMonthName(date.getMonth());
const monthOfDay = date.getDate();

/// update headerTime date
headerTime.textContent = `${weekDayName}, ${monthName} ${monthOfDay}`;


// toggle active class on element
const elemToggler = (elem) => {
     elem.classList.toggle('active');
}


// toggle active class on multiple element
const addEventOnMultiElem = (elems, event) => {
    
     for(let i =0; i < elems.length; i++){
        elems[i].addEventListener('click', event);
     }
}


// create taskItem elementNode and return it
const taskItemNode = (taskText) => {
  
     const creatTaskItem = document.createElement("li");
     creatTaskItem.classList.add('task-item');
     creatTaskItem.setAttribute('data-task-item', "");

     creatTaskItem.innerHTML = `
                <button class="item-icon" data-task-remove="complete">
                <span class="check-icon"></span>
                </button>
                <p class="item-text">${taskText}</p>
                <button class="item-action-btn" aria-label="Remove task" data-task-remove>
                    <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
                </button>
     `;

     return creatTaskItem;

}




// task input validation
const taskInputValidation = (taskIsValid) => {

      if(taskIsValid){
            
            // if there is an existing task 
            //then the new task will be added before it
            if(taskList.childElementCount > 0){
                 taskList.insertBefore(taskItemNode(taskInput.value), taskItem[0]);
            }else{
                taskList.appendChild(taskItemNode(taskInput.value)); 
            }

            ///after adding task in taskList, input field should be empty
            taskInput.value = '';

            /// hide the welcome node
            welcomeNote.classList.add('hide');

            /// update taskItem DOM selection 
            taskItem = document.querySelectorAll("[data-task-item]");
            taskRemover = document.querySelectorAll("[data-task-remove]");
      }else{
          // if user pass any false value like(0, "", undefined, null, NaN)
          alert('Please write something!');

      }
}


////// if there is an existing task the welcome note will be hidden
const removeWelcomeNote = () => {

     if(taskList.childElementCount > 0){
         welcomeNote.classList.add('hide');
     }else{
        welcomeNote.classList.remove('hide');
     }
}



//// remove task when click on delete button or check button
const removeTask = function() {

     // select click item
     const parentElement = this.parentElement;

     // if the task is completed, the task item would be remove after 250ms
     // if deleted then task item temove instant
     if(this.dataset.taskRemove == 'complete'){
         
         parentElement.classList.add("complete"); //add complete class on taskItem
         taskCompleteSound.play();

         setTimeout(() => {
            parentElement.remove(); // remove task item
            removeWelcomeNote();
         }, 250);

     }else{
        parentElement.remove();
        removeWelcomeNote();
     }
}


////// add task function
const addTask = () => {

     // check the task input validation
     taskInputValidation(taskInput.value);

     // addEventListener to all taskItem checkbox and delete button
     addEventOnMultiElem(taskRemover, removeTask);
}


// add keypress listener on task Input
taskInput.addEventListener('keypress', (e) => {
 
     ///add task if user press enter
     switch(e.key){
        case "Enter":
            addTask();
            break;   
     }
})



///////////////////////////////////////////////////////////////////////////////
///// toggle active class on menu when click on menu button or dropdown link

const toggleMenu = () => {
    elemToggler(menu);
}

addEventOnMultiElem(menuTogglers, toggleMenu);


///// toggle active class on modal when click on dropdownLink or modal ok button
const toggleModal = () => {
    elemToggler(modal);
}

addEventOnMultiElem(modalTogglers, toggleModal);


/////////////////////////////////////
/// add "loaded" class on body when website is fully loaded
window.addEventListener("load", () => {
    document.body.classList.add('loaded');
});


/////////////////////////////////////
/// change body background when clicking on ant theme btn
const themeChanger = function() {
     const hueValue = this.dataset.hue;
    //create css custom property on root and set value from vueValue
    console.log(document.documentElement.style.setProperty);
    document.documentElement.style.setProperty("--hue", hueValue);

    // remove active class from all themeBtns
    for(let i = 0; i < themeBtns.length; i++){
        if(themeBtns[i].classList.contains("active")){
            themeBtns[i].classList.remove("active");
        }
    }


    //// add active class on clicked btn
    this.classList.add('active');

}

///add event on all themeBtns
addEventOnMultiElem(themeBtns, themeChanger);