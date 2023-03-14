import { photoSet } from './data-generator.js';

const picturesContainer = document.querySelector ('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');


const similarPhotoFragment = document.createDocumentFragment();

photoSet.forEach(({photoUrl, photoLikes, photoComments}) => {
  const pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoUrl;
  pictureElement.querySelector('.picture__likes').textContent = photoLikes;
  pictureElement.querySelector('.picture__comments').textContent = photoComments.length;
  similarPhotoFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(similarPhotoFragment);

