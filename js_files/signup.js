const SignUpButton = document.getElementById('Signup-button')

function handlesignup() {
    console.log("button clicked!");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log("Username:", username, "Password:", password);

    //user did not fill in username or password
    if (!username || !password) {
        alert("Please fill in both fields!");
        return;
    }
    //username is already in use
    if (localStorage.getItem('user_' + username)) {
        alert("Username is already taken!");
        return;
    }

    //saves the info in (username, password)
    localStorage.setItem('user_' + username, password);

    //save an empty array for goals for this specific user
    localStorage.setItem('goals_' + username, JSON.stringify([]));

    console.log("User saved:", username);
    alert("Account created successfully! Redirecting to login page...")

    //redirect back to login page
    window.location.href = "login.html";
}

if (SignUpButton) {
    SignUpButton.addEventListener('click', handlesignup);
}
