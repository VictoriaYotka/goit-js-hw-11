import axios from "axios";

async function getImages(userQuery) {
    const URL = 'https://pixabay.com/api/';
    const options = {
        params: {
          key: '34916651-f99371deeade2de9e176e6ceb',
          q: userQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
    
    
        }
      }
    
        try {
          const response = await axios.get(URL, options);
          // console.log(response.data.hits);
          return response.data.hits;
        } catch (error) {
          console.error(error);
        }
}

      export {getImages};

//       webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads 
// webformatURL, largeImageURL, tags, likes, views, comments, downloads