import imagesGallery from './gallery-items.js';
console.log(imagesGallery);



const galleryEl = document.querySelector('.js-gallery');
console.log(galleryEl);
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');


const creatGalleryMarkup = action => {
    const { preview, original, description } = action;
    return `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>`;
};
    
const cardsMarkup = imagesGallery.map(creatGalleryMarkup).join('');
galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);


galleryEl.addEventListener('click', onOpenModal);
lightboxEl.addEventListener('click', closeModal);



function onOpenModal(event) {
    window.addEventListener('keydown', onEscKeyPress);
  if(!event.target.classList.contains('gallery__image')) {
    return;
  };
  event.preventDefault()
 lightboxEl.classList.add('is-open');
 lightboxImgEl.setAttribute('src', event.target.getAttribute('data-source'));
};

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.remove('is-open');
  lightboxImgEl.removeAttribute('src');
};

function closeModal(event) {
    
  if(event.target.classList.contains('lightbox__overlay')) {
    onCloseModal();
  };

  if(event.target.classList.contains('lightbox__button')) {
    onCloseModal();
  };
};

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
   
};


