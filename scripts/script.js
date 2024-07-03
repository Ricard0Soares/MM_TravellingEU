let currentIndex = 0;

function scrollCarousel(direction) {
    const carouselImages = document.querySelector('.carousel-images');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].clientWidth + 20; // Including margin
    const visibleItems = 3;
    const totalItems = items.length;

    currentIndex += direction;

    // Ensure the currentIndex is within the bounds
    if (currentIndex < 0) {
        currentIndex = totalItems - visibleItems;
    } else if (currentIndex > totalItems - visibleItems) {
        currentIndex = 0;
    }

    const offset = -currentIndex * itemWidth;
    carouselImages.style.transform = `translateX(${offset}px)`;
}
