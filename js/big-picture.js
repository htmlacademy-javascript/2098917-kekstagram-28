import './minis-generator.js';
import { picturesContainer } from './minis-generator.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PER_LOAD = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPicCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPicCommentsSection = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bodyTag = document.querySelector('body');
const minCommentsCount = bigPicture.querySelector('.min-count');
let batchOfComments;
let localComments;

// Функция выхода по нажатию Esc
function onBigPicEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}

// Закрытие большой фотографии
function closeBigPic () {
  bodyTag.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPicEscKeydown);
  commentLoader.removeEventListener('click', onLoadMore);
}

// Открытие большой фотографии
const openBigPic = () => {
  bigPicture.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  document.addEventListener('keydown', onBigPicEscKeydown);
};

// Заполнение большой фотографии данными (подстановка фотки, кол-во лайков, описание, сколько комментов показано из общего кол-ва)
const fillData = (pictureDescription) => {
  const numberOfComments = pictureDescription.comments.length;
  bigPicture.querySelector('.big-picture__img img').src = pictureDescription.url;
  bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
  bigPicture.querySelector('.comments-count').textContent = numberOfComments;
  bigPicture.querySelector('.social__caption').textContent = pictureDescription.description;
  minCommentsCount.textContent = numberOfComments <= COMMENTS_PER_LOAD ? numberOfComments : COMMENTS_PER_LOAD;
};

// Отрисовка отдельно взятого коммента и подцепка его в контейнер <ul>
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

// Отображение комментариев
const loadComments = () => {
  if (localComments.length <= COMMENTS_PER_LOAD) {
    createComments(localComments);
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
    batchOfComments = COMMENTS_PER_LOAD;
    createComments(localComments.slice(0, batchOfComments));
  }
  commentLoader.addEventListener('click', onLoadMore);
};

// Открытие большой фотографии
const openBigPicture = (photos) => {
  const onMiniPicClick = (evt) => {
    if(evt.target.closest('.picture')) {
      openBigPic();
      const target = evt.target.closest('.picture');
      const localPicElement = photos.find((photoItem) => Number(target.dataset.id) === photoItem.id);
      fillData(localPicElement);
      localComments = localPicElement.comments;
      loadComments(localComments);
    }
  };
  picturesContainer.addEventListener('click', onMiniPicClick);
};

// Подгрузка комментариев
function onLoadMore () {
  batchOfComments += COMMENTS_PER_LOAD;
  const loadedComments = localComments.slice(0, batchOfComments);
  if (loadedComments.length === localComments.length) {
    commentLoader.classList.add('hidden');
  }
  createComments(loadedComments);
  minCommentsCount.textContent = loadedComments.length;
}

bigPicCloseBtn.addEventListener('click', () => {
  closeBigPic();
});

bigPicCloseBtn.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPic();
  }
});

export { openBigPicture, picturesContainer, bodyTag };
