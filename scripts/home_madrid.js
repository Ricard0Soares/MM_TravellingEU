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
        { src: "../images/palacio_lago.jpg", description: "Vista exterior do Palácio Real" },
        { src: "../images/palacio_aerea.jpg", description: "Vista aérea do Palácio Real" },
        { src: "../images/palacio_salatrono.jpg", description: "Sala do Trono, onde os visitantes são recebidos de maneira oficial e cerimoniosa e onde, quando morriam, as capelas funerárias dos reis eram colocadas até serem levadas para o cemitério real." },
        { src: "../images/salao_espelhos.jpg", description: "Salão dos Espelhos, o local onde reis e rainhas se vestiam." },
        { src: "../images/salao_alabardeiros.jpg", description: "Salão dos Alabardeiros, primeiro ponto da visita e local que Carlos III decidiu que seria o local onde a guarda real (os alabardeiros) seria colocada" },
        { src: "../images/salao_gasparini.jpg", description: "Salão Gasparini, onde depois de receber oficialmente os visitantes no Salão das Colunas, o Rei e seus convidados entravam nessa sala para tomar um aperitivo ou um café." }
    ],
    "Museu do Prado": [
        { src: "../images/museu.png", description: "Imagem exterior do Museu do Prado" },
        { src: "../images/museu1.jpg", description: "Imagem exterior do Museu do Prado" },
        { src: "../images/maja.jpg", description: "A Maja Nua, de Goya está presente no museu, retratando uma jovem mulher deitada nua como se fosse uma Vênus, mas com sinais inequívocos de que o modelo era humano. Foi por esta razão e por certos detalhes de sua nudez que a pintura foi considerada um dos primeiros nus completos na pintura de uma mulher fora da mitologia." },
        { src: "../images/goya.jpg", description: "Saturno devorando seu filho, por Goya também está presente no museu, retratando o deus Chronos, ou Saturno, devorando um de seus filhos por medo de que um dia ele fosse destronado, tem em comum com esta pintura." },
        { src: "../images/lasmeninas.jpg", description: "Las meninas, por Diego Velazquez, retrata até 11 personagens, como as Meninas, filhas de Filipe IV e Mariana da Áustria, que também aparecem na pintura dentro de outra pintura, e até mesmo o próprio Velázquez. O artista se retrata em primeiro plano como se fosse o primeiro selfie da história." },
        { src: "../images/crucificacao.jpg", description: "A Crucificação, por Juan de Flandes, foi encomendado pelo Bispo Juan Rodríguez de Fonseca a Juan de Flandes, que o pintou para fazer parte do retábulo principal da Catedral de Palencia." }
    ],
    "Plaza Mayor": [
        { src: "../images/plaza.jpg", description: "Imagem da Plaza Mayor" },
        { src: "../images/plaza_filipe.jpg", description: "Estátua de Felipe III na Plaza Mayor" },
        { src: "../images/plaza_casaPadaria.jpg", description: "A casa Padaria situada na Plaza Mayor" },
        { src: "../images/plaza_natal.jpg", description: "Imagens do Mercado de Natal realizado na Plaza Mayor" },
        { src: "../images/plaza_neve.jpg", description: "Imagens da Plaza Mayor depois da queda de neve" }
    ],
    "Templo de Debod": [
        { src: "../images/debod.jpg", description: "Imagem do Templo de Debod com o pôr do sol" },
        { src: "../images/debod1.jpg", description: "Templo de Debod iluminado ao final do dia" },
        { src: "../images/debod2.jpeg", description: "Templo de Debod iluminado ao ínicio da noite" },
        { src: "../images/debod_aerea.jpg", description: "Imagem aérea do Templo de Debod" }
    ],
  };

  const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.3}s`;
                element.classList.add('fade-in-animation');
  });

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
    
    for (let i = 0; i < frames.length - 1; i++) {
        const start = frames[i];
        const end = frames[i + 1];
        
        if (currentTime >= start && currentTime < end) {
            highlightedCard = cards[i];
            break;
        }
    }
    
    if (currentTime >= frames[frames.length - 1]) {
        highlightedCard = cards[frames.length - 1];
    }
    
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
        cardDescriptionElement.textContent = "O Palácio Real de Madrid é a residência oficial do Rei de Espanha, situado em Madrid, a capital \n\n" +
        "espanhola, com uma área de 135 000 m² e 4318 quartos. Foi construído no mesmo local onde se encontrava um outro palácio, \n\n" +
        "denominado de Real Alcázar de Madrid, destruído por um incêndio que durou três dias, no ano de 1734. As obras começaram a \n\n" + 
        "6 de Abril de 1738, quando se lançou a primeira pedra. O Palácio Real de Madrid continua a ser, oficialmente, a residência \n\n" +
        "do Rei de Espanha, apesar de, na actualidade, o Rei o utilizar somente para ocasiões de gala, almoços, recepções oficiais, \n\n" +
        "entregas de prémios e audiências.";
    
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
    
        positionOverlayArea('10%','15%','50%','48%', 'block');
    
    
      } else if (currentTime >= 1 && currentTime < 6) {
    
          cardTitleElement.textContent = "Palácio Real";
          cardDescriptionElement.textContent = "O Palácio Real de Madrid é a residência oficial do Rei de Espanha, situado em Madrid, a capital \n\n" +
          "espanhola, com uma área de 135 000 m² e 4318 quartos. Foi construído no mesmo local onde se encontrava um outro palácio, \n\n" +
          "denominado de Real Alcázar de Madrid, destruído por um incêndio que durou três dias, no ano de 1734. As obras começaram a \n\n" + 
          "6 de Abril de 1738, quando se lançou a primeira pedra. O Palácio Real de Madrid continua a ser, oficialmente, a residência \n\n" +
          "do Rei de Espanha, apesar de, na actualidade, o Rei o utilizar somente para ocasiões de gala, almoços, recepções oficiais, \n\n" +
          "entregas de prémios e audiências.";

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
    
          positionOverlayArea('18%','25%','50%','22%', 'block');
    
      }else if(currentTime >= 6 && currentTime < 9){
          cardTitleElement.textContent = "Museu do Prado";
          cardDescriptionElement.textContent = "O Museu do Prado é o mais importante museu da Espanha e um dos mais importantes do mundo. \n\n" +
          "Apresentando belas e preciosas obras de arte, localiza-se em Madrid e foi mandado construir por Carlos III. As obras de \n\n" +
          "construção estenderam-se por muitos anos, tendo sido inaugurado somente no reinado de Fernando VII. Missa de São Gregório, \n\n"+
          "de Adriaan Isenbrant ou A Morte de Viriato, de José de Madrazo y Agudo são 2 das muitas obras importantes presentes no Museu";

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
    
          positionOverlayArea('1%','8%','90%','55%', 'block');
    
      }else if(currentTime >= 9 && currentTime < 12){
          cardTitleElement.textContent = "Plaza Mayor";
          cardDescriptionElement.textContent = "A Plaza Mayor situa-se no centro da cidade de Madrid a poucos metros da Porta do Sol e da Plaza de la Villa. É \n\n"+
          "uma praça retangular, rodeada de todos os lados de edifícios de três pisos, sendo a sua entrada apenas possível através dos nove \n\n"+
          "pórticos. Tem 129 metros de comprimento e 94 de largura. Existem ao todo 237 varandas ao longo de toda a praça. O pórtico mais \n\n"+
          "conhecido é o Arco de Cuchilleros, na esquina sudoeste da praça. Ao centro, no lado norte, ergue-se a Casa de la Panadería e à \n\n"+
          "sua frente, no lado sul, a 'Casa de la Carnicería. Debaixo dos pórticos, nas suas arcadas, estão estabelecidas lojas tradicionais, \n\n"+
          "constituindo um dos pontos turísticos de maior relevo na cidade.";

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
    
          positionOverlayArea('2%','5%','90%','53%', 'block');
    
      }else if(currentTime >= 12 && currentTime < 15){
          cardTitleElement.textContent = "Templo de Debod";
          cardDescriptionElement.textContent = "O Templo de Debod constitui um dos poucos testemunhos arquitectónicos núbio-egípcios \n\n"+
          "completos que podem ser contemplados fora do Egito e o único destas características existente na Espanha.Construído no século \n\n"+
          "IV a.C. pelo rei cuxita Adijalamani para reverenciar o deus Amom, até há apenas algumas décadas situava-se 15 km ao sul de Assuão, \n\n"+
          "no Egito, muito próximo da primeira catarata do Nilo e do grande centro religioso da deusa Ísis, em Filas. Originalmente \n\n"+ 
          "as paredes do templo eram decoradas com ilustrações mostrando o rei Adijalamani como um faraó egípcio doando oferendas aos \n\n"+
          "deuses. Essas pinturas perderam muito de seu brilho natural quando o templo ficou submerso no rio de Assuão.";

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
    
          positionOverlayArea('3%','40%','30%','50%', 'block');
    
      }else if(currentTime >= 15 && currentTime <= 17){
          cardTitleElement.textContent = "Templo de Debod";
          cardDescriptionElement.textContent = "O Templo de Debod constitui um dos poucos testemunhos arquitectónicos núbio-egípcios \n\n"+
          "completos que podem ser contemplados fora do Egito e o único destas características existente na Espanha.Construído no século \n\n"+
          "IV a.C. pelo rei cuxita Adijalamani para reverenciar o deus Amom, até há apenas algumas décadas situava-se 15 km ao sul de Assuão, \n\n"+
          "no Egito, muito próximo da primeira catarata do Nilo e do grande centro religioso da deusa Ísis, em Filas. Originalmente \n\n"+ 
          "as paredes do templo eram decoradas com ilustrações mostrando o rei Adijalamani como um faraó egípcio doando oferendas aos \n\n"+
          "deuses. Essas pinturas perderam muito de seu brilho natural quando o templo ficou submerso no rio de Assuão.";

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
    
          positionOverlayArea('25%','20%','12%','25%', 'block');
    
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
