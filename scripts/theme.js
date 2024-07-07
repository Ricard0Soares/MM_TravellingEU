function setTheme(theme) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        navbar.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        navbar.classList.remove('dark-mode');
    }
}
