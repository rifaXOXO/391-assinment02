//FORTUNE
const fortunes = [
    "Hard work pays off in the future, laziness pays off now.",
    "Don't hold onto things that require a tight grip.",
    "A stranger will cross your path who later becomes your friend.",
    "A chance happening will reveal your destiny.",
    "You will have a fun adventure..",
    "Something exciting will happen.",
    "A weight will be taken off your mind.",
    "Stay curious.",
    "Focus on long-term success.",
    "You are capable of more."
];

window.onload = function () {
    showRandomFortune();
    loadTasks(); 
};

function showRandomFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    document.getElementById("fortuneText").innerText = fortunes[randomIndex];
}


function changeStyle(number) {
    const box = document.getElementById("fortuneBox");
    const text = document.getElementById("fortuneText");

    if (number === 1) {
        box.style.backgroundColor = "#DEE66C";
        box.style.borderColor = "#5A7A0B";
        text.style.color = "#0B147A";
        box.style.fontFamily = "Georgia";
        box.style.fontSize = "20px";
    }

    if (number === 2) {
        box.style.backgroundColor = "#75D9C0";
        box.style.borderColor = "#0B147A";
        text.style.color = "#000000";
        box.style.fontFamily = "Courier New";
        box.style.fontSize = "17px";
    }

    if (number === 3) {
        box.style.backgroundColor = "#6DF271";
        box.style.borderColor = "#0B7A0F";
        text.style.color = "#074852";
        box.style.fontFamily = "Garamond";
        box.style.fontSize = "24px";
    }

    if (number === 4) {
        box.style.backgroundColor = "#DEA7F2";
        box.style.borderColor = "#531566";
        text.style.color = "#6E0C3D";
        box.style.fontFamily = "Brush Script MT";
        box.style.fontSize = "22px";
    }
}


// ---------------- STOPWATCH ----------------

let time = 0;
let interval = null;

function startTimer() {

    if (interval !== null) return;

    interval = setInterval(function () {
        time += 3;
        document.getElementById("timer").innerText = time;

        if (time >= 30) {
            clearInterval(interval);
            interval = null;
        }

    }, 1000); // changed from 3000 to 1000
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    time = 0;
    document.getElementById("timer").innerText = time;
}



// ---------------- TODO LIST ----------------

function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    displayTask(task);

    input.value = "";
}



function displayTask(task) {

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
        span.style.textDecoration = "line-through";
    }

    checkbox.onchange = function () {
        task.completed = checkbox.checked;
        span.style.textDecoration = checkbox.checked ? "line-through" : "none";
        updateStorage();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
        updateStorage();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}


function saveTask(task) {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        displayTask(task);
    });
}

function updateStorage() {

    const taskElements = document.querySelectorAll("#taskList li");
    const tasks = [];

    taskElements.forEach(function(li) {
        const text = li.querySelector("span").innerText;
        const completed = li.querySelector("input").checked;

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}