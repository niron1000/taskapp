// import tasks from "./tasks.json" assert { type: "json" };
// console.log(tasks);
tasks = document.querySelector(".tasks-list ul");
categories = document.querySelector(".categories ul");

document.addEventListener("DOMContentLoaded", () => {
  fetch("./tasks.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((task) => {
        LI = document.createElement("LI");
        LI.innerHTML = generateTask(task);
        tasks.appendChild(LI);
      });
    });
});

// ---- Implement search task ----- //
let searchDOM = document.querySelector(".nav-left .search input[type='text']");
searchDOM.addEventListener("keyup", function (e) {
  searchText = e.target.value;
  tasks.innerHTML = "";
  fetch("./tasks.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((task) => {
        LI = document.createElement("LI");
        // console.log(task["name"].includes(searchText));
        if (task["name"].includes(searchText)) {
          LI.innerHTML = generateTask(task);
          tasks.appendChild(LI);
        }
      });
    });
  // console.log(tasksLI);
});

// ---- Implement add new task ----- //
let btnAddNewTask = document.querySelector("#add-new");
btnAddNewTask.addEventListener("click", function (e) {
  btnAddNewTask.innerHTML = "";
  let inptTaskName = document.createElement("input");
  let inptTaskChecked = document.createElement("input");
  inptTaskChecked.setAttribute("type", "checkbox");
  inptTaskName.setAttribute("type", "text");
  inptTaskName.setAttribute("placeholder", "enter new task name...");
  btnAddNewTask.appendChild(inptTaskChecked);
  btnAddNewTask.appendChild(inptTaskName);

  inptTaskName.focus();
  inptTaskName.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      const currentDate = "07-Dec-2022";
      let new_task_name = e.target.value;
      let task = {
        name: new_task_name,
        category: "N/A",
        create_date: currentDate,
      };

      let LI = document.createElement("LI");
      LI.innerHTML = generateTask(task);
      tasks.appendChild(LI);

      inptTaskName.value = "";
    }
  });
});

// ---- Implement Filtter tasks by Category ----- //
function fitter_task(name) {
  tasks.innerHTML = "";
  fetch("./tasks.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((task) => {
        if (name == "all") {
          LI = document.createElement("LI");
          LI.innerHTML = generateTask(task);
          tasks.appendChild(LI);
        }
        if (task.category == name) {
          LI = document.createElement("LI");
          LI.innerHTML = generateTask(task);
          tasks.appendChild(LI);
        }
      });
    });
}

// ---- Implement add new Category ----- //
let btnAddNewCategory = document.querySelector(".add-new-category");
console.log(btnAddNewCategory);
btnAddNewCategory.addEventListener("click", function (e) {
  let newCategoryLI = document.createElement("LI");
  newCategoryLI.innerHTML = `
              <div class="category-info">
                  <span class="material-symbols-outlined">home</span>
                  <input type="text">
              </div>`;

  categories.appendChild(newCategoryLI);
  newCategoryInpt = newCategoryLI.querySelector("input");
  newCategoryInpt.focus();
  // console.log(newCategoryInpt);
});

function generateTask(task) {
  task = `
                  <div class="task">
                    <input type="checkbox" name="${task.name}"/> 
                    <lable >${task.name}</lable>
                  </div>
                  <div class="desc">
                    <span>${task.category}</span>
                    <span>${task.create_date}</span>
                  </div>
                `;
  return task;
}
