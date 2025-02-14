document.getElementById('signInForm').addEventListener('submit', async() => {
    event.preventDefault(); //prevent the form from submitting in the traditional way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

    const response = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
        window.location.href = '/home';
    } else {
        document.getElementById('message').innerText = data.message;
    }
});