document.addEventListener('DOMContentLoaded', function() {
    // Sample image data with prompts
    const imageData = [
        { id: 1, url: './img/1.jpg', prompt: 'Beautiful cartoon woman with vibrant colors, digital art', likes: 24 },
        { id: 2, url: './img/2.webp', prompt: 'Anime girl with blue hair in futuristic city', likes: 56 },
        { id: 3, url: './img/3.webp', prompt: 'LEGO version of famous movie character, cinematic lighting', likes: 12 },
        { id: 4, url: './img/4.webp', prompt: 'Pixel art of fantasy landscape with mountains and river', likes: 89 },
        { id: 5, url: './img/5.webp', prompt: 'Cartoon character in superhero pose, comic book style', likes: 45 },
        { id: 6, url: './img/6.webp', prompt: 'Cool anime boy with sword, dramatic lighting', likes: 67 },
        { id: 7, url: './img/7.jpg', prompt: 'LEGO action scene with explosions and vehicles', likes: 32 },
        { id: 8, url: './img/8.jpg', prompt: 'Pixel art game character with armor and weapons', likes: 78 },
        { id: 9, url: './img/9.jpg', prompt: 'Cute cartoon animals in forest setting', likes: 53 },
        { id: 10, url: './img/10.gif', prompt: 'Fantasy anime scene with magic and dragons', likes: 91 },
        { id: 11, url: './img/11.webp', prompt: 'LEGO Star Wars battle scene with detailed ships', likes: 120 },
        { id: 12, url: './img/12.webp', prompt: 'Pixel art fantasy village with medieval buildings', likes: 42 },
        { id: 13, url: './img/13.webp', prompt: 'Original cartoon superhero design with unique powers', likes: 65 },
        { id: 14, url: './img/14.webp', prompt: 'Sci-fi anime cityscape with flying cars', likes: 88 },
        { id: 15, url: './img/15.jpg', prompt: 'LEGO superhero team lineup with custom designs', likes: 37 },
        { id: 16, url: './img/16.webp', prompt: 'Pixel art space scene with planets and spaceships', likes: 104 },
        { id: 17, url: './img/17.webp', prompt: 'Cartoon villain with exaggerated features', likes: 29 },
        { id: 18, url: './img/18.webp', prompt: 'Anime samurai in traditional armor, cherry blossoms', likes: 76 },
        { id: 19, url: './img/19.webp', prompt: 'LEGO ninja battle in ancient Japanese setting', likes: 51 },
        { id: 20, url: './img/20.webp', prompt: 'Pixel art adventure game scene with treasure', likes: 63 },
        { id: 21, url: './img/21.webp', prompt: 'Funny cartoon characters in absurd situation', likes: 47 },
        { id: 22, url: './img/22.webp', prompt: 'Anime mecha robot in epic battle pose', likes: 112 },
        { id: 23, url: './img/23.webp', prompt: 'LEGO pirate ship with detailed sails and crew', likes: 38 },
        { id: 24, url: './img/24.webp', prompt: 'Pixel art zombie apocalypse survival scene', likes: 85 },
        { id: 25, url: './img/25.webp', prompt: 'Cartoon astronauts exploring alien planet', likes: 59 },
        { id: 26, url: './img/26.webp', prompt: 'Anime vampire with gothic clothing and red eyes', likes: 72 },
        { id: 27, url: './img/27.jpg', prompt: 'LEGO wizard with magical effects and spellbook', likes: 44 },
        { id: 28, url: './img/28.webp', prompt: 'Pixel art cyberpunk city with neon lights', likes: 97 },
        { id: 29, url: './img/29.webp', prompt: 'Cartoon detective with magnifying glass and hat', likes: 31 },
        { id: 30, url: './img/30.webp', prompt: 'Anime angel with glowing wings and halo', likes: 108 }
    ];

    const gallery = document.getElementById('image-gallery');
    const modal = document.getElementById('prompt-modal');
    const modalPromptText = document.getElementById('modal-prompt-text');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const generateBtn = document.getElementById('generate-btn');

    // Load images into gallery
    function loadImages() {
        gallery.innerHTML = '';
        imageData.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';
            imageCard.innerHTML = `
                <div class="image-container blurred">
                    <img src="${image.url}" alt="Generated image ${image.id}" data-id="${image.id}">
                </div>
                <div class="image-actions">
                    <button class="view-prompt" data-id="${image.id}">
                        <i class="fas fa-eye"></i> View Prompt
                    </button>
                    <button class="like-btn" data-id="${image.id}">
                        <i class="far fa-heart"></i> ${image.likes}
                    </button>
                </div>
            `;
            gallery.appendChild(imageCard);
        });

        // Add event listeners to new elements
        addEventListeners();
    }

    // Add all event listeners
    function addEventListeners() {
        // Image click to remove blur
        document.querySelectorAll('.image-container').forEach(container => {
            container.addEventListener('click', function() {
                this.classList.remove('blurred');
            });
        });

        // View prompt buttons
        document.querySelectorAll('.view-prompt').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.getAttribute('data-id'));
                const image = imageData.find(img => img.id === id);
                if (image) {
                    modalPromptText.textContent = image.prompt;
                    modalImage.src = image.url;
                    modal.style.display = 'block';
                }
            });
        });

        // Like buttons
        document.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = parseInt(this.getAttribute('data-id'));
                const image = imageData.find(img => img.id === id);
                if (image) {
                    const icon = this.querySelector('i');
                    if (this.classList.contains('liked')) {
                        // Unlike
                        this.classList.remove('liked');
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        image.likes--;
                    } else {
                        // Like
                        this.classList.add('liked');
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        image.likes++;
                    }
                    this.innerHTML = `<i class="${icon.className}"></i> ${image.likes}`;
                }
            });
        });
    }

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Generate button functionality (simulated)
    generateBtn.addEventListener('click', function() {
        alert('Image generation would happen here with a real API. This is a demo.');
    });

    // Initial load
    loadImages();
});

// Age Verification - Shows on every visit
document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('ageModal');
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    
    // Always show the modal (removed localStorage check)
    ageModal.style.display = 'flex';
    
    // Prevent closing by clicking outside
    ageModal.addEventListener('click', function(e) {
      if (e.target === ageModal) {
        e.stopPropagation();
      }
    });
    
    yesBtn.addEventListener('click', function() {
      ageModal.style.display = 'none';
      // Load content after verification
      loadContent();
    });
    
    noBtn.addEventListener('click', function() {
      // Redirect to safe site
      window.location.href = 'https://www.google.com';
    });
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    function loadContent() {
      // Allow scrolling
      document.body.style.overflow = '';
      // Your existing content loading code here
      // animateCards();
      // etc...
    }
  });