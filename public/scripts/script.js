document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    if (signUpButton) {
        signUpButton.addEventListener("click", () => {
            window.location.href = "signup.html";
        });
    }

    if (signInButton) {
        signInButton.addEventListener("click", () => {
            window.location.href = "signin.html";
        });
    }
});
