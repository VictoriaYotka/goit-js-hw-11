import { getImages } from "./js/fetch_function";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const formEl  = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let query = '';
let page = 1;

formEl.addEventListener('submit', formSubmitHandler);
loadMoreBtnEl.addEventListener('click', loadMoreHandler)

async function formSubmitHandler (event) {
    event.preventDefault();
    deleteMarkup();

    query = event.target.elements.searchQuery.value.trim();

    if(query === '') {
        console.log('empty!')
        return
    }

    const response = await getImages(query, page);
    // console.log(response);
    const data = response.hits;
    // console.log(data);

    if(data.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return
    }

    makeImagesMarkup(data);
    Notify.info(`Hooray! We found ${response.totalHits} images!`);
    page += 1;
    

}

async function loadMoreHandler () {
       const response = await getImages(query, page);
    // console.log(response);
    const data = response.hits;
    // console.log(data);

    makeImagesMarkup(data);
  
    page += 1;
}

function makeImagesMarkup(data) {
    const innerMarkup = data.map(el => `<div class="photo-card">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
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
   
  galleryEl.insertAdjacentHTML('beforeend', innerMarkup) 
}

function deleteMarkup () {
    galleryEl.innerHTML = ''
}


  