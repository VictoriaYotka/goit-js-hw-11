import axios from "axios";

async function getImages(userQuery, number, quantity) {
    const URL = 'https://pixabay.com/api/';
    
    const options = {
        params: {
          key: '34916651-f99371deeade2de9e176e6ceb',
          q: userQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: number,
          per_page: quantity,
        }
      }

      console.log(options.params.page)
    
        try {
          const response = await axios.get(URL, options);
          // console.log(response.data.hits);
          return response.data;
        } catch (error) {
          console.error(error);
        }
}

      export {getImages};

