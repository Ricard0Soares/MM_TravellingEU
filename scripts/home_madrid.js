document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const thumbnailWidth = 300;
  const thumbnailHeight = 120;
  const frames = [0, 6, 9, 13];
  const listOfMonuments = ['Palácio Real', 'Museu do Prado', 'Plaza Mayor', 'Templo de Debod'];
  let counter = 0;
  let currentActiveCard = null;

  const infoCard = document.getElementById('infoCard');

  
  const cardContainer = document.getElementById('cardContainer');
  const cardTitleElement = document.getElementById('cardTitle');
  const cardDescriptionElement = document.getElementById('cardDescription');
  const cardImagesElement = document.getElementById('cardImages');
  const overlayArea = document.getElementById('overlayArea');

  
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const closeButton = document.querySelector('.close');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;

  const cityId = 'Madrid';

  var imagesHolder = [];

  const imagesMap = {
    "Palácio Real": [
        { src: "../images/torre.jpeg", description: "Vista exterior da Torre de Belém" },
        { src: "../images/torre_vista.jpg", description: "Paisagem a partir da Torre" },
        { src: "../images/canhoes.jpg", description: "Canhões usados para proteger Lisboa, quando essa era a funcionalidade da Torre" },
        { src: "../images/virgem.jpg", description: "Virgem na parte exterior da Torre, que olhava os navios que partiam à descoberta do Mundo" },
        { src: "../images/sala_reis.jpg", description: "Sala dos Reis no interior da Torre" },
        { src: "../images/capela.jpg", description: "Capela da Torre de Belém" }
    ],
    "Museu do Prado": [
        { src: "../images/panoramica.jpg", description: "Vista Panorâmica do Parque das Nações" },
        { src: "../images/avenida.jpg", description: "Avenida Principal do Parque das Nações" },
        { src: "../images/torre_vasco.JPG", description: "Torre Vasco da Gama, edifício mais alto de Portugal" },
        { src: "../images/teleferico.jpeg", description: "Teleférico com vista panorâmica do Parque das Nações" },
        { src: "../images/centro.jpg", description: "Centro Comercial Vasco da Gama" },
        { src: "../images/parque.jpg", description: "Jardim das Ondas, um dos muitos no Parque das Nações" }
    ],
    "Plaza Mayor": [
        { src: "../images/padrao.jpg", description: "Imagem do Padrão dos Descobrimentos" },
        { src: "../images/padrao-4.jpg", description: "Imagem frontal do Padrão dos Descobrimentos" },
        { src: "../images/mirante.jpg", description: "Mirante do Padrão dos Descobrimentos" },
        { src: "../images/figuras1.jpg", description: "Algumas figuras presentes no Padrão" },
        { src: "../images/figuras.jpg", description: "Identificação de algumas figuras presentes no Padrão" },
        { src: "../images/area.jpg", description: "Vista aérea do Padrão dos Descobrimentos" }
    ],
    "Templo de Debod": [
        { src: "../images/mosteiro.jpg", description: "Imagem do Mosteiro dos Jerónimo" },
        { src: "../images/mosteiro1.jpg", description: "Imagem do Mosteiro dos Jerónimo" },
        { src: "../images/igreja.jpg", description: "Igreja no interior do Mosteiro, uma das mais belas obras arquiteturais da Europa" },
        { src: "../images/tumulo_camoes.jpg", description: "Túmulo de Camões no interior do Mosteiro" },
        { src: "../images/tumulo_vascoGama.jpg", description: "Túmulo de Vasco da Gama no interior do Mosteiro" },
        { src: "../images/claustro.jpg", description: "O íncrivel Claustro do Mosteiro dos Jerónimos" }
    ],
  };

  function openModal(index, images) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');

    console.log("... " + images.length);
    console.log("index " + index);

    modal.style.display = 'block';
    modalImage.src = images[index].src;
    modalDescription.textContent = images[index].description;
    imagesHolder = images;
    console.log("tamanho tt " + imagesHolder.length);
    currentIndex = index; // Atualiza o índice global
  }

  //fechar o modal
  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
  }

  //botão de fechar
  const closeModalButton = document.querySelector('#imageModal .close');
  closeModalButton.addEventListener('click', closeModal);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      showPrevImage();
    } else if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  nextButton.addEventListener('click', showNextImage);

  // Event listener para o botão prev (imagem anterior)
  prevButton.addEventListener('click', showPrevImage);

  // Função para mostrar a próxima imagem no modal
  function showNextImage() {
    console.log("tamanho ttn " + imagesHolder.length);
    currentIndex = (currentIndex + 1) % imagesHolder.length;
    openModal(currentIndex, imagesHolder);
  }

  // Função para mostrar a imagem anterior no modal
  function showPrevImage() {
    console.log("tamanho ttp " + imagesHolder.length);
    currentIndex = (currentIndex - 1 + imagesHolder.length) % imagesHolder.length;
    openModal(currentIndex, imagesHolder);
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

      // Adicionar o atributo data-time para facilitar a comparação
      cardDiv.setAttribute('data-time', time);

      cardDiv.addEventListener("click", () => {
          video.currentTime = time;
          video.play();
  
          // Destacar card ativo
          highlightCard(time);
      });

      const targetDiv = document.getElementById(targetDivId);
      targetDiv.appendChild(cardDiv);

      counter = (counter + 1) % listOfMonuments.length;
  }

  function highlightCard(currentTime) {
      const cards = document.querySelectorAll('.card');
      let highlightedCard = null;
      
      // find highlighted card
      cards.forEach(card => {
          const cardTime = parseFloat(card.getAttribute('data-time'));
          if (currentTime >= cardTime && currentTime < cardTime + 2) {
              highlightedCard = card;
          }
      });
    
      // if finds card to highlight, highlights
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
                  canvas.width = thumbnailWidth;
                  canvas.height = thumbnailHeight;
                  ctx.drawImage(video, 0, 0, thumbnailWidth, thumbnailHeight);
                  const dataURL = canvas.toDataURL();
                  video.removeEventListener('seeked', captureFrame);
                  resolve({ dataURL, time });
              }, 100);
          }, { once: true });
      });
  }

  async function createThumbnails() {
      let storedThumbnails = JSON.parse(localStorage.getItem('thumbnails_Madrid'));

      if (!storedThumbnails) {
          storedThumbnails = await generateAndStoreThumbnails();
      }

      loadThumbnailsFromStorage(storedThumbnails);
  }

  async function generateAndStoreThumbnails() {
      const storedThumbnails = [];
      for (let i = 0; i < frames.length; i++) {
          const { dataURL, time } = await generateThumbnail(frames[i]);
          storedThumbnails.push({ dataURL, time });
      }
      localStorage.setItem('thumbnails_Madrid', JSON.stringify(storedThumbnails));
      return storedThumbnails;
  }

  function loadThumbnailsFromStorage(thumbnails) {
      thumbnails.forEach(({ dataURL, time }) => {
          const img = new Image();
          img.src = dataURL;
          img.width = thumbnailWidth;
          img.height = thumbnailHeight;
          img.classList.add("thumbnail");
          createCard('thumbnails', img, time);
      });
  }

  createThumbnails();

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
    
         // Limpa o conteúdo existente
        cardImagesElement.innerHTML = "";

        const images = imagesMap["Palácio Real"];

        var index = 0;

        images.forEach((image, index) => {
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = image.src;
          img.alt = image.description;
          img.setAttribute('data-description', image.description);
          li.appendChild(img);
          cardImagesElement.appendChild(li);

          img.addEventListener('click', () => {
            openModal(index, images);
          });
        });
    
        positionOverlayArea('5%','25%','37%','23%', 'block');
    
    
      } else if (currentTime >= 1 && currentTime < 6) {
    
          cardTitleElement.textContent = "Palácio Real";
          cardDescriptionElement.textContent = "teste2";

           // Limpa o conteúdo existente
          cardImagesElement.innerHTML = "";

          const images = imagesMap["Palácio Real"];

          var index = 0;

          images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.description;
            img.setAttribute('data-description', image.description);
            li.appendChild(img);
            cardImagesElement.appendChild(li);

            img.addEventListener('click', () => {
              openModal(index, images);
            });
          });
    
          positionOverlayArea('5%','25%','50%','18%', 'block');
    
      }else if(currentTime >= 6 && currentTime < 9){
          cardTitleElement.textContent = "Museu do Prado";
          cardDescriptionElement.textContent = "teste3";

           // Limpa o conteúdo existente
          cardImagesElement.innerHTML = "";

          const images = imagesMap["Museu do Prado"];

          var index = 0;

          images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.description;
            img.setAttribute('data-description', image.description);
            li.appendChild(img);
            cardImagesElement.appendChild(li);

            img.addEventListener('click', () => {
              openModal(index, images);
            });
          });
    
          positionOverlayArea('1%','12%','75%','25%', 'block');
    
      }else if(currentTime >= 9 && currentTime < 12){
          cardTitleElement.textContent = "Plaza Mayor";
          cardDescriptionElement.textContent = "teste4";

           // Limpa o conteúdo existente
          cardImagesElement.innerHTML = "";

          const images = imagesMap["Plaza Mayor"];

          var index = 0;

          images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.description;
            img.setAttribute('data-description', image.description);
            li.appendChild(img);
            cardImagesElement.appendChild(li);

            img.addEventListener('click', () => {
              openModal(index, images);
            });
          });
    
          positionOverlayArea('2%','13%','72%','24%', 'block');
    
      }else if(currentTime >= 12 && currentTime < 15){
          cardTitleElement.textContent = "Templo de Debod";
          cardDescriptionElement.textContent = "teste2";

           // Limpa o conteúdo existente
          cardImagesElement.innerHTML = "";

          const images = imagesMap["Templo de Debod"];

          var index = 0;

          images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.description;
            img.setAttribute('data-description', image.description);
            li.appendChild(img);
            cardImagesElement.appendChild(li);

            img.addEventListener('click', () => {
              openModal(index, images);
            });
          });
    
          positionOverlayArea('3%','40%','30%','25%', 'block');
    
      }else if(currentTime >= 15 && currentTime <= 17){
          cardTitleElement.textContent = "Templo de Debod";
          cardDescriptionElement.textContent = "teste2";

           // Limpa o conteúdo existente
          cardImagesElement.innerHTML = "";

          const images = imagesMap["Templo de Debod"];

          var index = 0;

          images.forEach((image, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.description;
            img.setAttribute('data-description', image.description);
            li.appendChild(img);
            cardImagesElement.appendChild(li);

            img.addEventListener('click', () => {
              openModal(index, images);
            });
          });
    
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
