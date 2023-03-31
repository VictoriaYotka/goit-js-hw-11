import { getImages } from "./js/fetch_function";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const formEl  = document.querySelector('#search-form');

formEl.addEventListener('submit', formSubmitHandler);

async function formSubmitHandler (event) {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value;
    const imgArr = await getImages(query);
    console.log(imgArr)
}



  