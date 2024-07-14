document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const thumbnailWidth = 300;
  const thumbnailHeight = 120;
  const listOfMonuments = ['Torre de Belém', 'Torre de Belém', 'Parque das Nações', 'Parque das Nações', 'Mosteiro Jerónimos', 'Padrão dos Descobrimentos'];
  let counter = 0;

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

  const cityId = 'Lisboa';

  var imagesHolder = [];

  const imagesMap = {
    "Torre de Belem": [
        { src: "../images/torre.jpeg", description: "Vista exterior da Torre de Belém" },
        { src: "../images/torre_vista.jpg", description: "Paisagem a partir da Torre" },
        { src: "../images/canhoes.jpg", description: "Canhões usados para proteger Lisboa, quando essa era a funcionalidade da Torre" },
        { src: "../images/virgem.jpg", description: "Virgem na parte exterior da Torre, que olhava os navios que partiam à descoberta do Mundo" },
        { src: "../images/sala_reis.jpg", description: "Sala dos Reis no interior da Torre" },
        { src: "../images/capela.jpg", description: "Capela da Torre de Belém" }
    ],
    "Parque das Nacoes": [
        { src: "../images/panoramica.jpg", description: "Vista Panorâmica do Parque das Nações" },
        { src: "../images/avenida.jpg", description: "Avenida Principal do Parque das Nações" },
        { src: "../images/torre_vasco.JPG", description: "Torre Vasco da Gama, edifício mais alto de Portugal" },
        { src: "../images/teleferico.jpeg", description: "Teleférico com vista panorâmica do Parque das Nações" },
        { src: "../images/centro.jpg", description: "Centro Comercial Vasco da Gama" },
        { src: "../images/parque.jpg", description: "Jardim das Ondas, um dos muitos no Parque das Nações" }
    ],
    "Padrao dos Descobrimentos": [
        { src: "../images/padrao.jpg", description: "Imagem do Padrão dos Descobrimentos" },
        { src: "../images/padrao-4.jpg", description: "Imagem frontal do Padrão dos Descobrimentos" },
        { src: "../images/mirante.jpg", description: "Mirante do Padrão dos Descobrimentos" },
        { src: "../images/figuras1.jpg", description: "Algumas figuras presentes no Padrão" },
        { src: "../images/figuras.jpg", description: "Identificação de algumas figuras presentes no Padrão" },
        { src: "../images/area.jpg", description: "Vista aérea do Padrão dos Descobrimentos" }
    ],
    "Mosteiro dos Jeronimos": [
        { src: "../images/mosteiro.jpg", description: "Imagem do Mosteiro dos Jerónimo" },
        { src: "../images/mosteiro1.jpg", description: "Imagem do Mosteiro dos Jerónimo" },
        { src: "../images/igreja.jpg", description: "Igreja no interior do Mosteiro, uma das mais belas obras arquiteturais da Europa" },
        { src: "../images/tumulo_camoes.jpg", description: "Túmulo de Camões no interior do Mosteiro" },
        { src: "../images/tumulo_vascoGama.jpg", description: "Túmulo de Vasco da Gama no interior do Mosteiro" },
        { src: "../images/claustro.jpg", description: "O íncrivel Claustro do Mosteiro dos Jerónimos" }
    ],
    // Adicione outros mapeamentos de imagens conforme necessário
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

  // Função para fechar o modal
  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
  }

  // Adiciona evento de clique ao botão de fechar
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
      if (currentTime >= cardTime && currentTime < cardTime + 2) {
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

    if (currentTime >= 0 && currentTime < 2) {
      cardTitleElement.textContent = "Torre de Belém";
      cardDescriptionElement.textContent = "A Torre de Belém é uma fortificação localizada na freguesia de Belém, Município e \n\n" +
      "Distrito de Lisboa, em Portugal. Na margem direita do rio Tejo, onde existiu outrora a praia de Belém, era primitivamente \n\n" +
      "cercada pelas águas em todo o seu perímetro. Ao longo dos séculos foi envolvida pela praia, até se incorporar hoje a terra firme. \n\n" +
      "Um dos ex libris da cidade, o monumento é um ícone da arquitetura do reinado de D. Manuel I, numa síntese entre a torre de menagem \n\n"+
      "de tradição medieval e o baluarte moderno, onde se dispunham peças de artilharia. Juntamente com o Mosteiro dos Jerónimos, foi \n\n" +
      "classificada em 1983 como Património Mundial da UNESCO e eleita como uma das Sete Maravilhas de Portugal em 2007."
      
       // Limpa o conteúdo existente
      cardImagesElement.innerHTML = "";

      // Obtém o conjunto de imagens relevante
      const images = imagesMap["Torre de Belem"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '48%', '23%', '45%', 'block');

    } else if (currentTime >= 2 && currentTime < 4) {
      cardTitleElement.textContent = "Torre de Belém";
      cardDescriptionElement.textContent = "A Torre de Belém é uma fortificação localizada na freguesia de Belém, Município e \n\n" +
      "Distrito de Lisboa, em Portugal. Na margem direita do rio Tejo, onde existiu outrora a praia de Belém, era primitivamente \n\n" +
      "cercada pelas águas em todo o seu perímetro. Ao longo dos séculos foi envolvida pela praia, até se incorporar hoje a terra firme. \n\n" +
      "Um dos ex libris da cidade, o monumento é um ícone da arquitetura do reinado de D. Manuel I, numa síntese entre a torre de menagem \n\n"+
      "de tradição medieval e o baluarte moderno, onde se dispunham peças de artilharia. Juntamente com o Mosteiro dos Jerónimos, foi \n\n" +
      "classificada em 1983 como Património Mundial da UNESCO e eleita como uma das Sete Maravilhas de Portugal em 2007."
      
       // Limpa o conteúdo existente
       cardImagesElement.innerHTML = "";

      // Obtém o conjunto de imagens relevante
      const images = imagesMap["Torre de Belem"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '45%', '28%', '50%', 'block');

    } else if (currentTime >= 4 && currentTime < 8) {
      cardTitleElement.textContent = "Parque das Nações";
      cardDescriptionElement.textContent = "Parque das Nações é uma freguesia portuguesa do município de Lisboa, pertencente à Zona \n\n" +
      "Leste da capital, com 5,44 km² de área e 22 382 habitantes (2021). Surgiu há cerca de 25 anos, sendo considerado uma das melhores \n\n" +
      "zonas para se morar em Lisboa. Foi construído para receber a Expo 98. Este projeto de urbanização transformou uma zona \n\n" +
      "degradada numa das areas mais modernas de Lisboa. Têm imensas opções de entreternimento, desde parques, museus, teleférico, \n\n" +
      "centro comercial ou diversos restaurantes.";
      
       // Limpa o conteúdo existente
       cardImagesElement.innerHTML = "";
       
       const images = imagesMap["Parque das Nacoes"];
 
       var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '20%', '60%', '40%', 'block');

    } else if (currentTime >= 8 && currentTime < 11) {
      cardTitleElement.textContent = "Mosteiro dos Jerónimos";
      cardDescriptionElement.textContent = "O mosteiro dos jerónimos encontra-se classificado como Monumento Nacional desde 1907. \n\n"+
      "Foi classificado como património mundial pelo UNESCO, em 1983, juntamente com a Torre de Belém e considerado uma das 7 \n\n" +
      "maravilhas de Portugal, em 2007. Tem, desde 2016, o estatuto de Panteão Nacional. Está localizado na freguesia de Belém \n\n" +
      "(Município e Distrito Lisboa), região muito importante na época dos Descobrimentos, por ser de onde partiam os navios. \n\n" +
      "Ponto culminante da arquitectura manuelina, este mosteiro é o mais notável conjunto monástico português do seu tempo e uma \n\n" +
      "das principais igrejas-salão da Europa.Estreitamente ligado à Casa Real Portuguesa e à epopeia dos Descobrimentos, o \n\n" +
      "Mosteiro dos Jerónimos foi, desde muito cedo, interiorizado como um dos símbolos da nação";

      // Limpa o conteúdo existente
      cardImagesElement.innerHTML = "";
       
      const images = imagesMap["Mosteiro dos Jeronimos"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '10%', '80%', '45%', 'block');

    } else if (currentTime >= 11 && currentTime < 15) {
      cardTitleElement.textContent = "Mosteiro dos Jerónimos";
      cardDescriptionElement.textContent = "O mosteiro dos jerónimos encontra-se classificado como Monumento Nacional desde 1907. \n\n"+
      "Foi classificado como património mundial pelo UNESCO, em 1983, juntamente com a Torre de Belém e considerado uma das 7 \n\n" +
      "maravilhas de Portugal, em 2007. Tem, desde 2016, o estatuto de Panteão Nacional. Está localizado na freguesia de Belém \n\n" +
      "(Município e Distrito Lisboa), região muito importante na época dos Descobrimentos, por ser de onde partiam os navios. \n\n" +
      "Ponto culminante da arquitectura manuelina, este mosteiro é o mais notável conjunto monástico português do seu tempo e uma \n\n" +
      "das principais igrejas-salão da Europa.Estreitamente ligado à Casa Real Portuguesa e à epopeia dos Descobrimentos, o \n\n" +
      "Mosteiro dos Jerónimos foi, desde muito cedo, interiorizado como um dos símbolos da nação";

      // Limpa o conteúdo existente
      cardImagesElement.innerHTML = "";
       
      const images = imagesMap["Mosteiro dos Jeronimos"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '10%', '80%', '30%', 'block');

    } else if (currentTime >= 15 && currentTime < 19) {
      cardTitleElement.textContent = "Padrão dos Descobrimentos";
      cardDescriptionElement.textContent = "O Padrão dos Descobrimentos localiza-se na freguesia de Belém, na cidade e Distrito de \n\n"+
      "Lisboa, em Portugal. Em posição destacada na margem direita do rio Tejo, o monumento original, em materiais perecíveis, foi erguido em 1940 por ocasião da \n\n" + 
      "Exposição do Mundo Português para homenagear as figuras históricas envolvidas nos Descobrimentos portugueses. A réplica atual, \n\n" + 
      "em betão e pedra, é posterior, tendo sido inaugurada em 1960. O monumento foi pensado inicialmente por Cottinelli Telmo como uma \n\n" +
      "homenagem ao Infante D. Henrique. Por ocasião da Exposição do Mundo Português, em 1940, transformou-se em Padrão dos Descobrimentos, \n\n"+
      "celebrando não apenas o Infante mas também os seus colaboradores e seguidores. Feito de materiais perecíveis, foi desmontado em \n\n" +
      "1958 e reconstruido nos anos imediatos, em betão e pedra de lioz, por decisão de Salazar por ocasião do 5º centenário do \n\n" + 
      "Infante. Assim, O Padrão dos descobrimentos seria erguido no local de implantação original, em cimento e pedra rosal de \n\n" + 
      "Leiria, e as esculturas em calcário de Sintra.";

      // Limpa o conteúdo existente
      cardImagesElement.innerHTML = "";
       
      const images = imagesMap["Padrao dos Descobrimentos"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('10%', '30%', '20%', '40%', 'block');

    } else if (currentTime >= 19 && currentTime <= 22) {
      cardTitleElement.textContent = "Padrão dos Descobrimentos1";
      cardDescriptionElement.textContent = "O Padrão dos Descobrimentos localiza-se na freguesia de Belém, na cidade e Distrito de \n\n"+
      "Lisboa, em Portugal. Em posição destacada na margem direita do rio Tejo, o monumento original, em materiais perecíveis, foi erguido em 1940 por ocasião da \n\n" + 
      "Exposição do Mundo Português para homenagear as figuras históricas envolvidas nos Descobrimentos portugueses. A réplica atual, \n\n" + 
      "em betão e pedra, é posterior, tendo sido inaugurada em 1960. O monumento foi pensado inicialmente por Cottinelli Telmo como uma \n\n" +
      "homenagem ao Infante D. Henrique. Por ocasião da Exposição do Mundo Português, em 1940, transformou-se em Padrão dos Descobrimentos, \n\n"+
      "celebrando não apenas o Infante mas também os seus colaboradores e seguidores. Feito de materiais perecíveis, foi desmontado em \n\n" +
      "1958 e reconstruido nos anos imediatos, em betão e pedra de lioz, por decisão de Salazar por ocasião do 5º centenário do \n\n" + 
      "Infante. Assim, O Padrão dos descobrimentos seria erguido no local de implantação original, em cimento e pedra rosal de \n\n" + 
      "Leiria, e as esculturas em calcário de Sintra.";

      // Limpa o conteúdo existente
      cardImagesElement.innerHTML = "";
       
      const images = imagesMap["Padrao dos Descobrimentos"];

      var index = 0;

      // Event listener for images click
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

      positionOverlayArea('15%', '45%', '10%', '40%', 'block');

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

    if (currentTime >= 0 && currentTime < 4) {
      hoverMessageText = "Torre de Belém";
    } else if (currentTime >= 4 && currentTime < 8) {
      hoverMessageText = "Parque das Nações";
    } else if (currentTime >= 8 && currentTime < 15) {
      hoverMessageText = "Mosteiro dos Jerónimos";
    } else if (currentTime >= 15 && currentTime <= 22) {
      hoverMessageText = "Padrão dos Descobrimentos";
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
