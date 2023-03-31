import { getImages } from "./js/fetch_function";



const formEl  = document.querySelector('#search-form');

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (event) {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value;
    getImages(query);
}



  