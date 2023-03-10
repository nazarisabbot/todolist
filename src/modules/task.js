const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Variables
  const block__oftask = document.querySelector(".block__oftask");

  const form = document.forms["addTask"];
  const titleInput = form.elements["title"];
  const taskInput = form.elements["task"];

  // Function call
  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  block__oftask.addEventListener("click", onDeletehandler);

  function renderAllTasks(taskList) {
    if (!taskList) {
      alert("Give me a task list");
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      const div = renderOneTask(task);
      fragment.appendChild(div);
      block__oftask.appendChild(fragment);
    });
  }

  function renderOneTask(task) {
    const div = document.createElement("div");
    div.classList.add("task__items");
    div.setAttribute("data-task-id", task._id);

    const h1 = document.createElement("h1");
    h1.innerHTML = task.title;

    const p = document.createElement("p");
    p.innerHTML = task.body;

    const divButton = document.createElement("div");
    divButton.classList.add("task__button");
    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.innerHTML = "Delete";
    divButton.appendChild(button);

    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(divButton);

    return div;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();

    const titleValue = titleInput.value;
    const taskValue = taskInput.value;

    if (!titleValue || !taskValue) {
      alert("Fill in all fields please");
      return;
    }

    const task = createNewTask(titleValue, taskValue);
    const listItem = renderOneTask(task);

    block__oftask.insertAdjacentElement("afterbegin", listItem);
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `Task_${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(
      `Are you sure you want to delete the task "${title}"?`
    );
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (confirmed) {
      el.remove();
    } else {
      return;
    }
  }

  function onDeletehandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;

      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    } else {
      return;
    }
  }
})(tasks);
