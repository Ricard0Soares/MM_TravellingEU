document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const thumbnailWidth = 300;
  const thumbnailHeight = 120;
  const listOfMonuments = ['Palácio Real', 'Palácio Real', 'Museu do Prado', 'Plaza Mayor', 'Templo de Debod', 'Templo de Debod'];
  let counter = 0;

  const cardContainer = document.getElementById('cardContainer');
  const cardTitleElement = document.getElementById('cardTitle');
  const cardDescriptionElement = document.getElementById('cardDescription');
  const overlayArea = document.getElementById('overlayArea');

  const imageList = document.querySelectorAll('.image-list img');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const closeButton = document.querySelector('.close');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;

  const cityId = 'Madrid';

  function openModal(index) {
    currentIndex = index;
    modalImage.src = imageList[index].src;
    modalDescription.textContent = imageList[index].getAttribute('data-description');
    modal.style.display = 'block';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % imageList.length;
    openModal(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    openModal(currentIndex);
  }

  imageList.forEach((image, index) => {
    image.addEventListener('click', () => {
      openModal(index);
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      showPrevImage();
    } else if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  const savedThumbnails = localStorage.getItem(`thumbnails_${cityId}`);
  if (savedThumbnails) {
    loadThumbnailsFromStorage(JSON.parse(savedThumbnails));
  } else {
    detectChanges();
  }

  function createCard(targetDivId, frame, time) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.width = '8rem';
    cardDiv.style.height = '6rem';
    cardDiv.style.background = 'none';
    cardDiv.style.border = 'none';
    cardDiv.style.margin = '0.5rem'; // Adds margin around each card

    frame.className = 'card-img-top';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';
    cardBodyDiv.style.textAlign = 'center';
    cardBodyDiv.style.padding = '0.1rem';

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.style.color = 'white';
    cardText.style.marginTop = '0.1rem';
    cardText.style.fontSize = '12px';
    cardText.textContent = listOfMonuments[counter];

    cardDiv.appendChild(frame);
    cardBodyDiv.appendChild(cardText);
    cardDiv.appendChild(cardBodyDiv);

    // Store time as data attribute
    cardDiv.setAttribute('data-time', time);

    // Add click event listener to highlight the card
    cardDiv.addEventListener("click", () => {
      video.currentTime = time;
      video.play();

      // Highlight active card
      highlightCard(time);
    });

    const targetDiv = document.getElementById(targetDivId);
    targetDiv.appendChild(cardDiv);

    counter = (counter + 1) % listOfMonuments.length;
  }

  function highlightCard(currentTime) {
    const cards = document.querySelectorAll('.card');
    let highlightedCard = null; // Variável para armazenar a card destacada
    
    // Encontrar a card que está atualmente destacada
    cards.forEach(card => {
      const cardTime = parseFloat(card.getAttribute('data-time'));
      if (currentTime >= cardTime && currentTime < cardTime + 1) {
        highlightedCard = card;
      }
    });
  
    // Se encontrou uma card para destacar, realça apenas ela
    if (highlightedCard) {
      cards.forEach(card => {
        if (card === highlightedCard) {
          card.classList.add('active-card');
        } else {
          card.classList.remove('active-card');
        }
      });
    }
  }
  
  

  function generateThumbnail(time) {
    return new Promise((resolve) => {
      video.currentTime = time;
      video.addEventListener('seeked', function captureFrame() {
        setTimeout(() => {
          ctx.drawImage(video, 0, 0, thumbnailWidth, thumbnailHeight);
          const dataURL = canvas.toDataURL();
          const imageData = ctx.getImageData(0, 0, thumbnailWidth, thumbnailHeight).data;
          video.removeEventListener('seeked', captureFrame);
          resolve({ dataURL, time, imageData });
        }, 100); // Adjust the timeout duration as needed
      }, { once: true });
    });
  }

  async function detectChanges() {
    let lastImageData = null;
    const interval = 1;
    let thumbnails = [];

    video.addEventListener('loadeddata', async () => {
      const duration = video.duration;
      for (let t = 0; t < duration; t += interval) {
        const { dataURL, time, imageData } = await generateThumbnail(t);
        const img = new Image();
        img.src = dataURL;
        img.width = thumbnailWidth;
        img.height = thumbnailHeight;
        img.classList.add("thumbnail");
        img.setAttribute('data-time', time);

        if (!lastImageData) {
          createCard('thumbnails', img, time);
          lastImageData = imageData;
          thumbnails.push({ dataURL, time });
        } else {
          if (hasSignificantChange(lastImageData, imageData)) {
            createCard('thumbnails', img, time);
            lastImageData = imageData;
            thumbnails.push({ dataURL, time });
          }
        }
      }
      video.currentTime = 0;
      localStorage.setItem(`thumbnails_${cityId}`, JSON.stringify(thumbnails));
    });
  }

  function loadThumbnailsFromStorage(thumbnails) {
    thumbnails.forEach(({ dataURL, time }) => {
      const img = new Image();
      img.src = dataURL;
      img.width = thumbnailWidth;
      img.height = thumbnailHeight;
      img.classList.add("thumbnail");
      img.setAttribute('data-time', time);
      createCard('thumbnails', img, time);
    });
  }

  function hasSignificantChange(data1, data2) {
    let changedPixels = 0;
    const threshold = 100; // change threshold per pixel
    const maxChangedPixels = 0.6 * data1.length / 4;

    for (let i = 0; i < data1.length; i += 4) {
      const diff = Math.abs(data1[i] - data2[i]) +
        Math.abs(data1[i + 1] - data2[i + 1]) +
        Math.abs(data1[i + 2] - data2[i + 2]);

      if (diff > threshold) {
        changedPixels++;
      }
    }

    return changedPixels > maxChangedPixels;
  }

  video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    highlightCard(currentTime);

    if (currentTime >= 0 && currentTime < 1) {

      cardTitleElement.textContent = "Palácio Real";
      cardDescriptionElement.textContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n" +
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived\n" +
            "not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\n" +
            "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and\n" +
            "more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  
  
      positionOverlayArea('5%','25%','37%','23%', 'block');
  
  
    } else if (currentTime >= 1 && currentTime < 6) {
  
        cardTitleElement.textContent = "Palácio Real";
        cardDescriptionElement.textContent = "teste2";
  
        positionOverlayArea('5%','25%','50%','18%', 'block');
  
    }else if(currentTime >= 6 && currentTime < 9){
        cardTitleElement.textContent = "Museu do Prado";
        cardDescriptionElement.textContent = "teste3";
  
        positionOverlayArea('1%','12%','75%','25%', 'block');
  
    }else if(currentTime >= 9 && currentTime < 12){
        cardTitleElement.textContent = "Plaza Mayor";
        cardDescriptionElement.textContent = "teste4";
  
        positionOverlayArea('2%','13%','72%','24%', 'block');
  
    }else if(currentTime >= 12 && currentTime < 15){
        cardTitleElement.textContent = "Templo de Debod";
        cardDescriptionElement.textContent = "teste2";
  
        positionOverlayArea('3%','40%','30%','25%', 'block');
  
    }else if(currentTime >= 15 && currentTime <= 17){
        cardTitleElement.textContent = "Templo de Debod";
        cardDescriptionElement.textContent = "teste2";
  
        positionOverlayArea('10%','24%','12%','15%', 'block');
  
    } else {
        overlayArea.style.display = 'none';
    }
  });

  function positionOverlayArea(top, left, width, height, display) {
    overlayArea.style.top = top;
    overlayArea.style.left = left;
    overlayArea.style.width = width;
    overlayArea.style.height = height;
    overlayArea.style.display = display;
  }

  overlayArea.addEventListener('mouseenter', (event) => {
    let hoverMessageText = "";
    const currentTime = video.currentTime;

    if (currentTime >= 0 && currentTime < 6) {
      hoverMessageText = "Palácio Real";
    } else if (currentTime >= 6 && currentTime < 9) {
        hoverMessageText = "Museu do Prado";
    } else if (currentTime >= 9 && currentTime < 12) {
        hoverMessageText = "Plaza Mayor";
    } else if (currentTime >= 12 && currentTime <= 17) {
        hoverMessageText = "Templo de Debod";
    }

    showHoverMessage(event, hoverMessageText);
  });

  overlayArea.addEventListener('mouseleave', () => {
    hideHoverMessage();
  });

  overlayArea.addEventListener('click', () => {
    cardContainer.style.display = 'block';
    video.pause();
  });

  function showHoverMessage(event, message) {
    const hoverMessage = document.createElement('div');
    hoverMessage.textContent = message;
    hoverMessage.classList.add('hover-message');
    document.body.appendChild(hoverMessage);

    updateHoverMessagePosition(event);

    function updateHoverMessagePosition(event) {
      hoverMessage.style.top = event.clientY + 'px';
      hoverMessage.style.left = event.clientX + 'px';
    }

    document.addEventListener('mousemove', updateHoverMessagePosition);

    setTimeout(() => {
      hoverMessage.remove();
      document.removeEventListener('mousemove', updateHoverMessagePosition);
    }, 5000);
  }

  function hideHoverMessage() {
    const hoverMessage = document.querySelector('.hover-message');
    if (hoverMessage) {
      hoverMessage.remove();
    }
  }

  video.addEventListener('play', () => {
    cardContainer.style.display = 'none';
  });
});