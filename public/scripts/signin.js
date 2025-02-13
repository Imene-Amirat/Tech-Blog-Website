document.getElementById('signInForm').addEventListener('submit', async() => {
    event.preventDefault(); //prevent the form from submitting in the traditional way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);
s
    const data = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
});