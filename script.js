const goalTextEl = document.getElementById("goal-text");
const goalBeansEl = document.getElementById("goal-beans");
const addGoalBtn = document.getElementById("add-goal");
const clearGoalsBtn = document.getElementById("clear-goals");
const goalListEl = document.getElementById("goal-list");

let goals = []; // stores {text, beans, completed}

// Add a new goal
addGoalBtn.addEventListener("click", () => {
  const text = goalTextEl.value.trim();
  const beans = parseInt(goalBeansEl.value);

  if (!text || isNaN(beans)) {
    alert("Please enter both a goal and a bean value!");
    return;
  }

  if (goals.length >= 3) {
    alert("Max of 3 goals per day!");
    return;
  }

  const newGoal = { text, beans, completed: false };
  goals.push(newGoal);
  renderGoals();

  goalTextEl.value = "";
  goalBeansEl.value = "";
});

// Clear all goals
clearGoalsBtn.addEventListener("click", () => {
  goals = [];
  renderGoals();
});

// Render goals into the list
function renderGoals() {
  goalListEl.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = goal.completed;
    checkbox.addEventListener("change", () => {
      if (!goal.completed) {
        totalBeans += goal.beans; // add beans only once
        updateBeans();
      }
      goal.completed = true;
      renderGoals();
    });

    const span = document.createElement("span");
    span.textContent = `${goal.text} (+${goal.beans} beans)`;
    if (goal.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    goalListEl.appendChild(li);
  });
}
