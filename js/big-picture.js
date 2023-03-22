import './minis-generator.js';
import { picturesContainer } from './minis-generator.js';
import { photoSet } from './data-generator.js';
import { isEscapeKey } from './util.js'

const bigPicture = document.querySelector('.big-picture');
const bigPicCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPicCommentsSection = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const commentsBlock = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bodyTag = document.querySelector('body');

function onBigPicEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}

function closeBigPic () {
  bodyTag.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPicEscKeydown);
}

const openBigPic = () => {
  bigPicture.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  commentsBlock.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onBigPicEscKeydown);
};

const fillData = (pictureDescription) => {
  bigPicture.querySelector('.big-picture__img img').src = pictureDescription.url;
  bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureDescription.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureDescription.description;
};

const createComments = (comments) => {
  const singleCommentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    singleCommentFragment.appendChild(newComment);
  });
  bigPicCommentsSection.innerHTML = '';
  bigPicCommentsSection.appendChild(singleCommentFragment);
};

const onMiniPicClick = (evt) => {
  if(evt.target.closest('.picture')) {
    openBigPic();
    const target = evt.target.closest('.picture');
    const localPicElement = photoSet.find((photoItem) => Number(target.dataset.id) === photoItem.id);
    fillData(localPicElement);
    createComments(localPicElement.comments);
  }
};

picturesContainer.addEventListener('click', onMiniPicClick);

bigPicCloseBtn.addEventListener('click', () => {
  closeBigPic();
});

bigPicCloseBtn.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPic();
  }
});

export { onMiniPicClick, picturesContainer };
