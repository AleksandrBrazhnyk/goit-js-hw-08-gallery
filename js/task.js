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
  rightBtn.addEventListener('click', onClickRightBtn);
  leftBtn.addEventListener('click', onClickLeftBtn);
  window.addEventListener('keydown', onRightKeyClick);
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onLeftKeyClick);
  if(!event.target.classList.contains('gallery__image')) {
    return;
  };
  event.preventDefault()
  lightboxEl.classList.add('is-open');
  const imgLink = event.target.dataset.source;
  const imgDescr = event.target.alt;
  //lightboxImgEl.setAttribute('src', event.target.getAttribute('data-source'));
  //lightboxImgEl.setAttribute('alt', event.target.getAttribute('data-source'));
  setItemLink(imgLink, imgDescr);
}; 

function onCloseModal() {
  rightBtn.removeEventListener('click', onClickRightBtn);
  leftBtn.removeEventListener('click', onClickLeftBtn);
  window.removeEventListener('keydown', onRightKeyClick); 
  window.removeEventListener('keydown', onLeftKeyClick); 
  window.removeEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.remove('is-open');
  //lightboxImgEl.removeAttribute('src');
  //lightboxImgEl.removeAttribute('alt');
  lightboxImgEl.src = "";
  lightboxImgEl.alt = "";
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

function setItemLink(link, descr) {
  lightboxImgEl.src = link;
  lightboxImgEl.alt = descr;
}

//functins for left right scroll
const rightBtn = document.querySelector('.gallery-item__right-btn');
const leftBtn = document.querySelector('.gallery-item__left-btn');
const imagesRef = document.querySelectorAll('.gallery__image');
console.log(imagesRef);

let currentImg = 0;

function onRightKeyClick(evt) {
  if (evt.code === "ArrowRight") {
    onClickRightBtn()
  }
}

function onLeftKeyClick(evt) {
  if (evt.code === "ArrowLeft") {
    onClickLeftBtn()
  }
}

function onClickRightBtn() { 
  if (currentImg === imagesRef.length - 1) {
    currentImg = 0;
  } else {
    currentImg += 1;
  }
  lightboxImgEl.src = imagesRef[currentImg].dataset.source;
}

function onClickLeftBtn() {
  if (currentImg === 0) {
    currentImg = imagesRef.length - 1;
  } else {
    currentImg -= 1;
  }
  lightboxImgEl.src = imagesRef[currentImg].dataset.source;
}

