function goalsLoad() {
    console.log("Goals page loaded!");

    //software security purposes ensuring logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    //get username to display
    document.getElementById('username-display').textContent = currentUser;

    //load goals
    displayGoals(currentUser);
}

function displayGoals(username) {
    const goals = JSON.parse(localStorage.getItem('goals_' + username)) || [];
    const goalist = document.getElementById('goals-list');
    const emptyState = document.getElementById('empty-state');

    console.log(`Found ${goals.length} goals for ${username}:`, goals);

    //handles duplicates
    goalist.innerHTML = "";

    if (goals.length === 0) {
        emptyState.style.display = 'block';
        goalist.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    goalist.style.display = 'block';

    //display each goal
    goals.forEach(goal => {
        const goalHTML = `
            <div class="big-goal" onclick="toggleSubgoals('${goal.id}')">
                <h3>${goal.title} ▼</h3>
                <div class="goal-header">
                    <span class="completion-status ${goal.completed ? 'completed' : 'incomplete'}">
                        ${goal.completed ? '✅ Completed' : '🟡 In Progress'}
                    </span>
                    <button onclick="markGoalComplete('${goal.id}', event)" class="complete-btn">
                        ${goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                </div>
                <div class="subgoals" id="subgoals-${goal.id}" style="display: none;">
                    ${goal.subgoals.map((subgoal, index) => `
                        <div class="subgoal">
                            <input type="checkbox" ${subgoal.completed ? 'checked' : ''}>
                            <span>${subgoal}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        goalist.insertAdjacentHTML('beforeend', goalHTML);
    });
}

function toggleSubgoals(goalId) {
    console.log("Toggling subgoals for goal:", goalId);
    const subgoalsDiv = document.getElementById(`subgoals-${goalId}`);
    const arrow = subgoalsDiv.parentElement.querySelector('h3');

    if (subgoalsDiv.style.display === 'none') {
        subgoalsDiv.style.display = 'block';
        arrow.innerHTML = arrow.innerHTML.replace('▼', '▲');
    } else {
        subgoalsDiv.style.display = 'none';
        arrow.innerHTML = arrow.innerHTML.replace('▲', '▼');
    }
}

function markGoalComplete(goalId, event) {
    event.stopPropagation(); // Prevent triggering the parent click

    const currentUser = sessionStorage.getItem('currentUser');
    const goals = JSON.parse(localStorage.getItem('goals_' + currentUser)) || [];

    //find the goal
    const goalIndex = goals.findIndex(g => g.id.toString() === goalId.toString());
    if (goalIndex !== -1) {
        goals[goalIndex].completed = !goals[goalIndex].completed;

        goals[goalIndex].subgoals = goals[goalIndex].subgoals.map(subgoal => ({
            ...subgoal,
            completed: goals[goalIndex].completed
        }));

        localStorage.setItem('goals_' + currentUser, JSON.stringify(goals));
        displayGoals(currentUser); // Refresh display
    }
}

//run
goalsLoad();
