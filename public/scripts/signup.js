document.getElementById('signUpForm').addEventListener('submit', async() => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);
    console.log(username);

    if(password.length < 8){
        console.log('eknlkjvnr');
        document.getElementById('message').innerText = 'Password must be at least 8 characters long.';
        return;
    } 

    const upperCase = /[A-Z]/;
    if(!upperCase.test(password)){
        document.getElementById('message').innerText = 'Password must contain at least one uppercase letter.';
        return;
    }

    const response = await fetch('/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
    });

    const data = await response.json();

    if (response.status === 200) {
        window.location.href = '/home';
    } else {
        document.getElementById('message').innerText = data.message;
    }

});