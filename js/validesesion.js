export const validateSession = () => {
    let hasToken = localStorage.getItem("token");
    let createPostBtn = document.getElementById("createPostBtn");
    let notifications = document.getElementById("notifications");
    let avatar = document.getElementById("avatar");
    let createAccount = document.getElementById("createAccount");

    if (!hasToken) {
        createPostBtn.classList.remove("d-md-block");
        avatar.classList.add("d-none");
        notifications.classList.add("d-none");
        createAccount.classList.add("d-md-block");
    } else {
        createPostBtn.classList.add("d-md-block");
        avatar.classList.remove("d-none");
        notifications.classList.remove("d-none");
        createAccount.classList.remove("d-md-block");
    }
};

export const logOut = () => {
    localStorage.removeItem("token");
    validateSession();
};

