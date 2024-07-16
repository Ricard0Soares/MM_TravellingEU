document.addEventListener("DOMContentLoaded", function() {
    const paths = document.querySelectorAll("#europe-map path");

    paths.forEach(function(path) {
        path.addEventListener("mouseover", function(event) {
            const countryName = path.getAttribute("title");
            showTooltip(countryName, event.clientX, event.clientY);
        });

        path.addEventListener("mouseout", function() {
            hideTooltip();
        });
    });

    function showTooltip(text, x, y) {
        let tooltip = document.getElementById("tooltip");
        tooltip.textContent = text;
        tooltip.style.left = x + 10 + "px";
        tooltip.style.top = y + 10 + "px";
        tooltip.style.display = "block";
    }

    function hideTooltip() {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
    }
});
