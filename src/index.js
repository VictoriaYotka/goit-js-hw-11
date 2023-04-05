import Fetch from "./js/fetch_function";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl  = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

formEl.addEventListener('submit', formSubmitHandler);
loadMoreBtnEl.addEventListener('click', loadMoreHandler);

let gallery = new SimpleLightbox('.gallery a');
const fetchImages = new Fetch;

fetchImages.query = formEl.elements.searchQuery.value.trim();
const {query} = fetchImages;

async function formSubmitHandler (event) {
    event.preventDefault();
    galleryEl.innerHTML = '';
    loadMoreBtnEl.classList.add('is-hidden');
    fetchImages.pageRestart(); // page = 1;

    const query = findInputValue();

    if(query === '') {
      Notify.failure('Please, write your search query!')
        return
    }

    const response = await fetchImages.getImages(query);
    // console.log(response);
    const data = response.hits;
    // console.log(data);

    if(data.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    }

    makeImagesMarkup(data);
    Notify.info(`Hooray! We found ${response.totalHits} images!`);
    fetchImages.pageIncrement();   // page += 1;
    
    gallery.refresh();

    if(response.totalHits > data.length) {
    loadMoreBtnEl.classList.remove('is-hidden');
    }
}

async function loadMoreHandler () {
       const response = await fetchImages.getImages(findInputValue());
    // console.log(response);
    const data = response.hits;
    // console.log(data);

    makeImagesMarkup(data);
    fetchImages.pageIncrement();   // page += 1;
    gallery.refresh();

    const amount = fetchImages.options.params.per_page;

    if((galleryEl.childElementCount / amount) > (response.totalHits / amount)) {
    loadMoreBtnEl.classList.add('is-hidden');
    }
}

function findInputValue () {
  return formEl.elements.searchQuery.value.trim();
}

function makeImagesMarkup(data) {
    const innerMarkup = data.map(el => `<div class="photo-card">
    <a href="${el.largeImageURL}">
    <img src="${el.webformatURL}" alt="${el.tags} loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
      ${el.likes}</p>
      <p class="info-item">
        <b>Views</b>
      ${el.views}</p>
      <p class="info-item">
        <b>Comments</b>
      ${el.comments}</p>
      <p class="info-item">
        <b>Downloads</b>
      ${el.downloads}</p>
    </div>
  </div>`).join(' ');
   
  galleryEl.insertAdjacentHTML('beforeend', innerMarkup);
}
