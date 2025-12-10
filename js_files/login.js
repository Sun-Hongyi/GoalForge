const loginButton = document.getElementById('Login-button');

function handleLoggedIn() {
    console.log("Login Button clicked!");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const savedpassword = localStorage.getItem('user_' + username);
    if (savedpassword === password) {
        alert("Login Successful");
        //save user session
        sessionStorage.setItem('currentUser', username);
        //go to logged in page
        window.location.href = "loggedinpage.html";
    } else {
        alert("Unsuccessful login");
    }
}

if (loginButton) {
    loginButton.addEventListener('click', handleLoggedIn);
}
