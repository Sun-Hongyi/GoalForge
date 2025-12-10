let subgoalCount = 1;

function subgoalAdd() {
    //get the subgoal button
    const subgoalbutton = document.getElementById('subgoal_btn');

    if (subgoalbutton) {
        subgoalbutton.addEventListener('click', subgoallisting) 
    }

    //make the save button work
    const saveGoalBtn = document.getElementById(`goal_set`);
    if (saveGoalBtn) {
        saveGoalBtn.addEventListener('click', savegoalhandling)
    }
}

function subgoallisting() {
    console.log("Button clicked!");

    //create the subgoal HTML
    const subgoalHtml = `
    <div class="subgoal-item">
        <label for="subgoal_${subgoalCount}">Subgoal ${subgoalCount}:</label>
        <input type="text" id="subgoal_${subgoalCount}" placeholder="Enter subgoal ${subgoalCount}" required>
        <button type="button" class="remove-subgoal">×</button>
    </div>
    `;

    //add to subgoal list
    document.getElementById('subgoals-list').insertAdjacentHTML('beforeend', subgoalHtml);

    //add a remove functionality with button x
    const newRemovebtn = document.querySelector('.subgoal-item:last-child .remove-subgoal');

    newRemovebtn.addEventListener('click', function() {
        this.parentElement.remove();
        updateSubgoalNumbers();
    });

    subgoalCount++;
    console.log(`Added subgoal ${subgoalCount - 1}`);
}

function updateSubgoalNumbers() {
    const items = document.querySelectorAll('.subgoal-item');
    items.forEach((item, index) => {
        const newNumber = index + 1;
        item.querySelector('label').textContent = `Subgoal ${newNumber}:`
        item.querySelector('label').htmlFor = `subgoal_${newNumber}`;
        item.querySelector('input').id = `subgoal_${newNumber}`;
        item.querySelector('input').placeholder = `Enter subgoal ${newNumber}`;
    })
    subgoalCount = items.length + 1;
}

function savegoalhandling() {
    const finalGoal = document.getElementById('final_goal').value;
    const subgoals = [];

    //collect all subgoal values
    document.querySelectorAll('.subgoal-item input').forEach(input => {
        if (input.value.trim()) {
            subgoals.push(input.value.trim())
        }
    })

    //no final goal is filled
    if (!finalGoal) {
        alert("Please enter your final goal!");
        return;
    }

    console.log("Final Goal:", finalGoal);
    console.log("Subgoals:", subgoals);


    //saving to local data
    const currentUser = sessionStorage.getItem('currentUser');

    if (!currentUser) {
        alert("Not logged in!");
        window.location.href = "login.html";
        return;
    }

    //get existing goals or create empty array
    const goals = JSON.parse(localStorage.getItem(`goals_` + currentUser)) || [];

    //add new goal
    goals.push({
        id: Date.now(),
        title: finalGoal,
        subgoals: subgoals,
        completed: false,
        createdAt: new Date().toISOString()
    })

    //save 
    localStorage.setItem('goals_' + currentUser, JSON.stringify(goals));

    alert("Goal Saved!");
    window.location.href = "loggedinpage.html";
}

//run 
subgoalAdd();