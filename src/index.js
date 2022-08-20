import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderGallery } from './render';

const refs = {
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.search-form__load-more'),
    gallery: document.querySelector('.gallery')
}

let lightbox = new SimpleLightbox('.gallery a',
    {
        overlayOpacity: 1,
        captionDelay: 250,
        nav: true,
        widthRatio: 1,
        heightRatio: 1
    });

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29399752-0d03e198c8870edeb20a38aaf';
let searchQuery = '';
let pageCount = 1;
let imagesShown = 0;
  
async function getImages(searchQuery) {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageCount}`);
    return response;
}

refs.form.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', onBtnClickLoadMoreImages);

function searchImages(event) {
    event.preventDefault();

    imagesShown = 0;
    refs.gallery.innerHTML = '';

    searchQuery = event.target[0].value;

    if (searchQuery === "") return Notify.failure('The search field can not be empty! Try again!', {
        position: 'center-center',
        width: '340px',
    });

    processImages();
}

function onBtnClickLoadMoreImages(event) {
    event.preventDefault();

    pageCount += 1;
    processImages();    
    scrollImages();
}

function processImages(response) {
    getImages(searchQuery)
        .then(response => {
            if (response.data.hits.length === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
                    position: 'center-center',
                    width: '340px',
                });
            } else {
                let galleryListMarkup = '';
                response.data.hits.map(item => {
                    galleryListMarkup += renderGallery(item);
                    imagesShown += 1;
                });
                refs.gallery.insertAdjacentHTML('beforeend', galleryListMarkup);
                lightbox.refresh();
                
                if (response.data.hits.length > 0) refs.loadMoreBtn.removeAttribute('disabled');
                if (imagesShown >= response.data.totalHits) {
                    Notify.info(`We're sorry, but you've reached the end of search results.`);
                    refs.loadMoreBtn.setAttribute('disabled', true);
                    refs.form.reset();
                    imagesShown = 0;
                }
            }
        }).catch(error => Notify.failure('OOPS! Something went wrong! Try again!', {
            position: 'center-center',
            width: '340px',
        }));
}

function scrollImages() {
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 10,
  behavior: "smooth",
});
}