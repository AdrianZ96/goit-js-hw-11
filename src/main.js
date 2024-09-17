// Opisany w dokumentacji
import iziToast from "izitoast";
// Opcjonalny import stylów
import "izitoast/dist/css/iziToast.min.css";
// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";


document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#searchForm');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchValue = document.querySelector('#search').value.trim();

        if (searchValue) {
            fetchPictures(searchValue);
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Wprowadź słowo kluczowe do wyszukiwania.',
            });
        }
    });
});




  const fetchPictures = (founds) => {
    const API_KEY = '46036688-33de53886d5db16dc3a765a31';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(founds)}&image_type=photo&orientation=horizontal&safesearch=true`;

    console.log(`Fetching images for: ${founds}`); //

    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length > 0) {
          displayImages(data.hits);
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Przepraszamy, nie znaleziono obrazów dla tej frazy.',
          });
        }
      })
      .catch(error => {
        console.error('Błąd w pobieraniu obrazów:', error);
        iziToast.error({
          title: 'Error',
          message: 'Błąd w pobieraniu obrazów. Sprawdź połączenie z internetem.',
        });
      });
  };


  const displayImages = (images) => {
    const galleryBox = document.querySelector('.gallery');
    galleryBox.innerHTML = '';

    const eachPhoto = images.map(image => {
      return `<a href="${image.largeImageURL}" class="gallery-item" >
        <img src="${image.webformatURL}" alt="${image.tags}" width="250px" height="350px" />
        <div class="image-info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </a>`;
    }).join('');

    galleryBox.innerHTML = eachPhoto;

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  }
