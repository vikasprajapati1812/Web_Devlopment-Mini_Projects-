let editIndex = null;

////////// loading tasks from local storage //////////////
function loadingTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  renderingTaskList(tasks);
}
/////////////////// rendering the task list ///////////////////
function renderingTaskList(tasks) {
  const taskList = document.getElementById("taskLists");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.completed ? "completed" : "";
    taskItem.innerHTML = createItemsInsideList(task, index);
    taskList.appendChild(taskItem);
  });
}

///////////////// Creating Items Inside Unordered list ////////////
function createItemsInsideList(task, index) {
  return `
    <div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <span><strong>Due Date-</strong>${task.dueDate}</span>
    </div>
    <div>
      <button class="completeBtn" onclick="markTaskCompleted(${index})">Complete</button>
      <button class="editBtn" onclick="editTask(${index})">Edit</button>
      <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
    </div>
  `;
}

////////////////// adding or editing a task ////////////////////
document.getElementById("addbtn").addEventListener("click", function () {
  const title = document.getElementById("taskInput").value;
  const description = document.getElementById("taskDescrip").value;
  const dueDate = document.getElementById("taskDueDate").value;

  if (title && dueDate && description) {
    const tasks = JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];

    /////////////////////// Directly edit or push new task based on editIndex ///////////
    if (editIndex !== null) {
      tasks[editIndex] = {
        title,
        description,
        dueDate,
        completed: tasks[editIndex].completed,
      };
    } else {
      tasks.push({ title, description, dueDate, completed: false });
    }

    ///////////// Setting  the above tasks to local storage 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadingTasks();

    /////////////////// Clear inputs 
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDescrip").value = "";
    document.getElementById("taskDueDate").value = "";
    
     editIndex = null;
  } else {
    alert("Please enter all Fields.");
  }
});




///////////////// Editing a task ////////////
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const task = tasks[index];

  document.getElementById("taskInput").value = task.title;
  document.getElementById("taskDescrip").value = task.description;
  document.getElementById("taskDueDate").value = task.dueDate;
  editIndex = index;
}


/////////////////// Delete particular task functionality /////////////////
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadingTasks();
  }
}



//////////////////// Marking a task as completed //////////
function markTaskCompleted(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadingTasks();
}



//////////////////// filter tasks ///////////////
document.querySelectorAll('input[name="TaskCompleted"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const filter = this.id;
    const tasks = JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    const filteredTasks = tasks.filter((task) => {
      if (filter === "all") return true;
      return filter === "completed" ? task.completed : !task.completed;
    });
    renderingTaskList(filteredTasks);
  });
});

/////////////////////// Search tasks //////////////
document.getElementById("searchInput").addEventListener("input", function () {
  const searchQueryBy = this.value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQueryBy) ||
      task.description.toLowerCase().includes(searchQueryBy)
  );

  renderingTaskList(filteredTasks);
});
