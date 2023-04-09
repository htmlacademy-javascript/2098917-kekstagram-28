import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS = 10;
const picturesContainer = document.querySelector ('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');

const renderMiniPhotos = (photos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments, id, description}) => {
    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.id = id;
    similarPhotoFragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(similarPhotoFragment);
};

const sortByComments = (photoOne, photoTwo) => {
  const commentsA = photoOne.comments.length;
  const commentsB = photoTwo.comments.length;
  return commentsB - commentsA;
};

const sortRandomly = () => Math.random() > 0.5 ? 1 : -1;

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const sortPhotos = (photos) => {
  const defaultSorting = document.querySelector('#filter-default');
  const randomSorting = document.querySelector('#filter-random');
  const sortingByComments = document.querySelector('#filter-discussed');

  defaultSorting.addEventListener('click', debounce(() => {
    defaultSorting.classList.add('img-filters__button--active');
    randomSorting.classList.remove('img-filters__button--active');
    sortingByComments.classList.remove('img-filters__button--active');
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    renderMiniPhotos(photos);
  }, RERENDER_DELAY));

  randomSorting.addEventListener('click', debounce(() => {
    defaultSorting.classList.remove('img-filters__button--active');
    randomSorting.classList.add('img-filters__button--active');
    sortingByComments.classList.remove('img-filters__button--active');
    const sortedPhotos = photos.slice().sort(sortRandomly).slice(0, RANDOM_PHOTOS);
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    renderMiniPhotos(sortedPhotos);
  }, RERENDER_DELAY));

  sortingByComments.addEventListener('click', debounce(() => {
    sortingByComments.classList.add('img-filters__button--active');
    defaultSorting.classList.remove('img-filters__button--active');
    randomSorting.classList.remove('img-filters__button--active');
    const sortedPhotos = photos.slice().sort(sortByComments);
    const picArray = document.querySelectorAll('.picture');
    picArray.forEach((picture) => {
      picture.remove();
    });
    renderMiniPhotos(sortedPhotos);
  }, RERENDER_DELAY));
};


export { picturesContainer, renderMiniPhotos, showFilters, sortPhotos };
