document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("myVideo");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const thumbnailWidth = 300;
    const thumbnailHeight = 120;
    const frames = [0, 6, 14, 22, 28];
    const listOfMonuments = ['Opéra Garnier', 'Jardim de Luxemburgo', 'Arco do Triunfo', 'Museu do Louvre', 'Torre Eiffel'];
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
    const cityId = 'Paris';

    var imagesHolder = [];

    const imagesMap = {
        "Opéra Garnier": [
            { src: "../images/opera.jpg", description: "Imagem da Opéra Garnier durante o dia" },
            { src: "../images/opera_noite.jpg", description: "Imagem da Opéra Garnier durante a noite" },
            { src: "../images/opera_simbolos.jpg", description: "Significado dos elementos presentes na fachada da Opéra Garnier" },
            { src: "../images/opera1.jpg", description: "Imagem da Opéra Garnier" },
            { src: "../images/interior_opera.jpg", description: "Imagem do interior do palácio da Opéra Garnier" },
            { src: "../images/interior_opera1.jpg", description: "Imagem do interior do palácio da Opéra Garnier" }
        ],
        "Jardim de Luxemburgo": [
            { src: "../images/jardim.jpg", description: "Fonte do Jardim de Luxemburgo" },
            { src: "../images/jardim1.jpg", description: "Vista do Jardim de Luxemburgo" },
            { src: "../images/jardim2.jpg", description: "Ambiente verde e harmonia do Jardim de Luxemburgo" }
        ],
        "Arco do Triunfo": [
            { src: "../images/arco.jpg", description: "Imagem do Arco do Triunfo" },
            { src: "../images/arco1.jpg", description: "Imagem do Arco do Triunfo" },
            { src: "../images/arco2.jpg", description: "Imagem ao longe do Arco do Triunfo" },
            { src: "../images/arco3.jpg", description: "Imagem do Arco do Triunfo durante o Outono" },
            { src: "../images/arco_noite.jpg", description: "Imagem do Arco do Triunfo durante a noite" },
            { src: "../images/arco_area.jpg", description: "Vista aérea do Arco do Triunfo" }
        ],
        "Museu do Louvre": [
            { src: "../images/louvre.jpg", description: "Imagem do Museu do Louvre" },
            { src: "../images/louvre_noite.jpg", description: "Imagem do Museu do Louvre ao final do dia" },
            { src: "../images/monalisa.jpg", description: "O retrato da suposta esposa de Francesco del Giocondo é considerado o quadro mais famoso do mundo. O roubo desta tela de Leonardo da Vinci no século XIX e os mistérios sobre sua origem não param de atrair as multidões." },
            { src: "../images/bodas.jpg", description: "As Bodas de Caná é uma história narrada no Antigo Testamento da Bíblia. O quadro encomendado ao pintor Veronese pelos monges beneditinos de um mosteiro de Veneza retoma este tema. É apreciado por sua maneira de mostrar a sociedade veneziana de sua época através de uma narrativa bíblica." },
            { src: "../images/venusMilo.png", description: "A Vênus de Milo não tem braços, mas isso não tira nada de sua beleza. Descoberta em 1820, foi oferecida ao rei Luís XIII, que a deu ao Louvre. É uma mais das famosas representações da deusa Vênus ou Afrodite para os Gregos." },
            { src: "../images/vitoria.jpg", description: "Com uma altura total de 5,57 metros, a Vitória de Samotrácia é uma das obras mais emblemáticas do Louvre e também uma das mais impressionantes." }
        ],
        "Torre Eiffel": [
            { src: "../images/eiffel.jpg", description: "Imagem da Torre Eiffel" },
            { src: "../images/eiffel_night.jpg", description: "Imagem da Torre Eiffel durante a noite" },
            { src: "../images/eiffel1.jpeg", description: "Imagem da Torre Eiffel" },
            { src: "../images/eiffel_baixo.jpg", description: "Vista da Torre Eiffel a partir do solo" },
            { src: "../images/elevador.jpg", description: "Elevador para subir a Torre Eiffel" },
            { src: "../images/mirante_eiffel.jpg", description: "Vista a partir do topo da Torre Eiffel" }
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
        let storedThumbnails = JSON.parse(localStorage.getItem('thumbnails_Paris'));

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
        localStorage.setItem('thumbnails_Paris', JSON.stringify(storedThumbnails));
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

        if (currentTime >= 0 && currentTime < 3) {
            cardTitleElement.textContent = "Opéra Garnier";
            cardDescriptionElement.textContent = "A Ópera Garnier ou Palais Garnier é uma casa de ópera localizada no IX arrondissement \n\n"+
            "de Paris, França. O edifício é considerado uma das obras-primas da arquitetura de seu tempo. Construído em estilo neobarroco, \n\n" +
            "é o 13º teatro a hospedar a Ópera de Paris, desde sua fundação por Luís XIV, em 1669. A sua capacidade é de 1979 espectadores \n\n" +
            "sentados. O palácio era chamado apenas de Ópera de Paris, mas, após a inauguração da Ópera da Bastilha, em 1989, passou \n\n"+
            "a ser chamado Ópera Garnier.";
            
            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Opéra Garnier"];

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

            positionOverlayArea('8%', '10%', '80%', '50%', 'block');

        } else if (currentTime >= 3 && currentTime < 5) {
            cardTitleElement.textContent = "Opéra Garnier";
            cardDescriptionElement.textContent = "A Ópera Garnier ou Palais Garnier é uma casa de ópera localizada no IX arrondissement \n\n"+
            "de Paris, França. O edifício é considerado uma das obras-primas da arquitetura de seu tempo. Construído em estilo neobarroco, \n\n" +
            "é o 13º teatro a hospedar a Ópera de Paris, desde sua fundação por Luís XIV, em 1669. A sua capacidade é de 1979 espectadores \n\n" +
            "sentados. O palácio era chamado apenas de Ópera de Paris, mas, após a inauguração da Ópera da Bastilha, em 1989, passou \n\n"+
            "a ser chamado Ópera Garnier.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Opéra Garnier"];

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

            positionOverlayArea('10%', '40%', '40%', '50%', 'block');

        } else if (currentTime >= 5 && currentTime < 10) {
            cardTitleElement.textContent = "Jardim de Luxemburgo";
            cardDescriptionElement.textContent = "O Jardim do Luxemburgo é um grande parque público da cidade de Paris com mais de \n\n"+
            "22,4 hectares, localizado no 6.º arrondissement. O Jardim do Luxemburgo atualmente pertence ao Senado da França, que está \n\n"+
            "sediado no famoso Palácio do Luxemburgo.O jardim possui um enorme parterre decorado com uma coleção exuberante de \n\n"+
            "estátuas e também com pequenos lagos destinados ao lazer infantil. O jardim inclui também um pequeno teatro de fantoches, \n\n"+
            "um pomar e um restaurante. Fica próximo ao Teatro Odéon.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Jardim de Luxemburgo"];

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

            positionOverlayArea('15%', '35%', '30%', '23%', 'block');

        } else if (currentTime >= 10 && currentTime < 14) {
            cardTitleElement.textContent = "Jardim de Luxemburgo";
            cardDescriptionElement.textContent = "O Jardim do Luxemburgo é um grande parque público da cidade de Paris com mais de \n\n"+
            "22,4 hectares, localizado no 6.º arrondissement. O Jardim do Luxemburgo atualmente pertence ao Senado da França, que está \n\n"+
            "sediado no famoso Palácio do Luxemburgo.O jardim possui um enorme parterre decorado com uma coleção exuberante de \n\n"+
            "estátuas e também com pequenos lagos destinados ao lazer infantil. O jardim inclui também um pequeno teatro de fantoches, \n\n"+
            "um pomar e um restaurante. Fica próximo ao Teatro Odéon.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Jardim de Luxemburgo"];

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

            positionOverlayArea('15%', '25%', '50%', '23%', 'block');

        } else if (currentTime >= 14 && currentTime < 16) {
            cardTitleElement.textContent = "Arco do Triunfo";
            cardDescriptionElement.textContent = "O Arco do Triunfo é um monumento localizado na cidade de Paris, construído em \n\n" +
            "comemoração às vitórias militares de Napoleão Bonaparte, o qual ordenou a sua construção em 1806, aos moldes dos arcos \n\n"+
            "triunfais romanos. Inaugurado em 1836, a monumental obra detém, gravados, os nomes de 128 batalhas e 558 generais. Na sua \n\n"+
            "base, situa-se o túmulo do soldado desconhecido (1920). O arco localiza-se na praça Charles de Gaulle, no encontro da avenida \n\n"+
            "Champs-Élysées. Nas extremidades da avenida encontram-se a Praça da Concórdia e, na outra, La Défense.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Arco do Triunfo"];

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


            positionOverlayArea('10%', '25%', '50%', '35%', 'block');

        } else if (currentTime >= 16 && currentTime < 21) {
            cardTitleElement.textContent = "Arco do Triunfo";
            cardDescriptionElement.textContent = "O Arco do Triunfo é um monumento localizado na cidade de Paris, construído em \n\n" +
            "comemoração às vitórias militares de Napoleão Bonaparte, o qual ordenou a sua construção em 1806, aos moldes dos arcos \n\n"+
            "triunfais romanos. Inaugurado em 1836, a monumental obra detém, gravados, os nomes de 128 batalhas e 558 generais. Na sua \n\n"+
            "base, situa-se o túmulo do soldado desconhecido (1920). O arco localiza-se na praça Charles de Gaulle, no encontro da avenida \n\n"+
            "Champs-Élysées. Nas extremidades da avenida encontram-se a Praça da Concórdia e, na outra, La Défense.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Arco do Triunfo"];

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

            positionOverlayArea('5%', '10%', '85%', '50%', 'block');

        } else if (currentTime >= 21 && currentTime < 24) {
            cardTitleElement.textContent = "Museu do Louvre";
            cardDescriptionElement.textContent = "Louvre ou Museu do Louvre é o maior museu de arte do mundo e um monumento histórico \n\n"+
            "em Paris, França. Um marco central da cidade, está localizado na margem direita do rio Sena, no 1º arrondissement (distrito) \n\n"+
            "da cidade. Aproximadamente 38 mil objetos, da pré-história ao século XXI, são exibidos em uma área de 72 735 metros quadrados. \n\n"+
            "Em 2019, o Louvre recebeu 9,6 milhões de visitantes, o que o torna o museu mais visitado do mundo. O museu está instalado no Palácio \n\n"+
            "do Louvre, originalmente construído como o Castelo do Louvre nos séculos XII e XIII durante o reinado de Filipe II.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Museu do Louvre"];

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

            positionOverlayArea('10%', '3%', '60%', '50%', 'block');

        } else if (currentTime >= 24 && currentTime < 28) {
            cardTitleElement.textContent = "Interior Museu do Louvre";
            cardDescriptionElement.textContent = "Muitas são as obras famosas e importantes presentes no Museu do Louvre, onde se destaca \n\n"+
            "por exemplo, A jangada da Medusa, a Mona Lisa, as Bodas de caná, a Vitória de Samotrácia, a Vênus de Milo ou a Sagração de Napoleão";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Museu do Louvre"];

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


            positionOverlayArea('10%', '3%', '90%', '50%', 'block');

        } else if (currentTime >= 28 && currentTime < 31) {
            cardTitleElement.textContent = "Torre Eiffel";
            cardDescriptionElement.textContent = "Torre Eiffel é uma torre de treliça de ferro forjado no Champ de Mars, em Paris, \n\n"+
            "França. Tem o nome do engenheiro Gustave Eiffel, cuja empresa projetou e construiu a torre. Foi construída de 1887 a 1889 \n\n"+
            "como a peça central da Exposição Universal de 1889 e foi inicialmente criticada por alguns dos principais artistas e \n\n"+
            "intelectuais franceses pelo seu design, mas tornou-se um ícone cultural global da França e uma das estruturas mais \n\n"+
            "reconhecidas do mundo. A Torre Eiffel é o monumento pago mais visitado do mundo; 6,91 milhões de pessoas subiram na \n\n"+
            "torre em 2015. Foi designado um monumento histórico em 1964 e foi nomeado parte do Patrimônio Mundial pela UNESCO em 1991 \n\n" +
            "A torre tem 330 metros de altura, aproximadamente a mesma altura de um edifício de 81 andares, e é a estrutura mais alta \n\n"+
            "de Paris. Sua base é quadrada, medindo 125 metros de cada lado.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Torre Eiffel"];

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


            positionOverlayArea('5%', '15%', '70%', '30%', 'block');

        } else if (currentTime >= 31 && currentTime <= 34) {
            cardTitleElement.textContent = "Torre Eiffel";
            cardDescriptionElement.textContent = "Torre Eiffel é uma torre de treliça de ferro forjado no Champ de Mars, em Paris, \n\n"+
            "França. Tem o nome do engenheiro Gustave Eiffel, cuja empresa projetou e construiu a torre. Foi construída de 1887 a 1889 \n\n"+
            "como a peça central da Exposição Universal de 1889 e foi inicialmente criticada por alguns dos principais artistas e \n\n"+
            "intelectuais franceses pelo seu design, mas tornou-se um ícone cultural global da França e uma das estruturas mais \n\n"+
            "reconhecidas do mundo. A Torre Eiffel é o monumento pago mais visitado do mundo; 6,91 milhões de pessoas subiram na \n\n"+
            "torre em 2015. Foi designado um monumento histórico em 1964 e foi nomeado parte do Patrimônio Mundial pela UNESCO em 1991 \n\n" +
            "A torre tem 330 metros de altura, aproximadamente a mesma altura de um edifício de 81 andares, e é a estrutura mais alta \n\n"+
            "de Paris. Sua base é quadrada, medindo 125 metros de cada lado.";

            // Limpa o conteúdo existente
            cardImagesElement.innerHTML = "";

            const images = imagesMap["Torre Eiffel"];

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

            positionOverlayArea('7%', '25%', '45%', '52%', 'block');

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

        if (currentTime >= 0 && currentTime < 5) {
            hoverMessageText = "Opéra Garnier";
        } else if (currentTime >= 5 && currentTime < 14) {
            hoverMessageText = "Jardim de Luxemburgo";
        } else if (currentTime >= 14 && currentTime < 21) {
            hoverMessageText = "Arco do Triunfo";
        } else if (currentTime >= 21 && currentTime < 24) {
            hoverMessageText = "Museu do Louvre";
        } else if (currentTime >= 24 && currentTime < 28) {
            hoverMessageText = "Interior do Museu do Louvre";
        } else if (currentTime >= 28 && currentTime <= 34) {
            hoverMessageText = "Torre Eiffel";
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
