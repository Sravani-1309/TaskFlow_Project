document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const timeInput = document.getElementById("timeInput");
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;
    const time = timeInput.value;
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const taskList = deadline === today ? document.getElementById("todayTaskList") : document.getElementById("remainingTaskList");
    
    const li = document.createElement("li");
    li.innerHTML = `<div class='task-details'>
                        <strong>${taskText}</strong><br>
                        <small>Deadline: ${deadline || "No deadline"} at ${time || "No time specified"}</small>
                    </div>
                    <button class='complete-btn' onclick='completeTask(this)'>✔</button>
                    <button class='delete-btn' onclick='deleteTask(this)'>X</button>`;
    
    taskList.appendChild(li);
    
    taskInput.value = "";
    deadlineInput.value = "";
    timeInput.value = "";
    updateTaskStats();
}

function deleteTask(button) {
    const uncompletedList = document.getElementById("uncompletedTaskList");
    uncompletedList.appendChild(button.parentElement);
    updateTaskStats();
}

function completeTask(button) {
    const completedList = document.getElementById("completedTaskList");
    const now = new Date();
    const completedTime = now.toLocaleString();
    
    const taskItem = button.parentElement;
    const taskDetails = taskItem.querySelector(".task-details");
    
    const completionInfo = document.createElement("div");
    completionInfo.innerHTML = `<small>Completed on:</small><br><small>${completedTime}</small>`;
    taskDetails.appendChild(completionInfo);
    
    completedList.appendChild(taskItem);
    button.remove();
    updateTaskStats();
}

function updateTaskStats() {
    const todayTaskCount = document.getElementById("todayTaskList").children.length;
    const remainingTaskCount = document.getElementById("remainingTaskList").children.length;
    const completedTaskCount = document.getElementById("completedTaskList").children.length;
    const uncompletedTaskCount = document.getElementById("uncompletedTaskList").children.length;
    
    document.getElementById("taskStats").innerText = 
        `Today's Tasks: ${todayTaskCount}, Upcoming Tasks: ${remainingTaskCount}, 
         Completed: ${completedTaskCount}, Uncompleted: ${uncompletedTaskCount}`;
}
