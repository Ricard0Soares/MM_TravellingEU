/*function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }*/

function switchTheme(theme) {
    // Remove all existing theme classes
    document.body.classList.remove('dark-theme', 'yellow-theme', 'blue-theme', 'default-theme');

    // Add the selected theme class
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'yellow') {
        document.body.classList.add('yellow-theme');
    } else if (theme === 'blue') {
        document.body.classList.add('blue-theme');
    } else {
        document.body.classList.add('default-theme');
    }

    // Store the selected theme in localStorage
    localStorage.setItem('theme', theme);
    }

// On page load, apply the saved theme if any
document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    switchTheme(savedTheme);
    document.getElementById('theme-selector').value = savedTheme;
});



function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'default';
    localStorage.setItem('theme', theme);
}