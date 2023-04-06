import { createPhotoCard, PHOTO_ID } from './data-generator.js';

const picturesContainer = document.querySelector ('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const photoSet = Array.from({length: PHOTO_ID}, createPhotoCard);

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

export { picturesContainer, renderMiniPhotos, photoSet };
