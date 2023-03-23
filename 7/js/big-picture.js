import './minis-generator.js';
import { picturesContainer } from './minis-generator.js';
import { photoSet } from './data-generator.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPicCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPicCommentsSection = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const commentLoader = bigPicture.querySelector('.comments-loader');
const bodyTag = document.querySelector('body');
const minCommentsCount = bigPicture.querySelector('.min-count');

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
  document.addEventListener('keydown', onBigPicEscKeydown);
};

const fillData = (pictureDescription) => {
  const numberOfComments = pictureDescription.comments.length;
  bigPicture.querySelector('.big-picture__img img').src = pictureDescription.url;
  bigPicture.querySelector('.likes-count').textContent = pictureDescription.likes;
  bigPicture.querySelector('.comments-count').textContent = numberOfComments;
  bigPicture.querySelector('.social__caption').textContent = pictureDescription.description;
  if (numberOfComments <= 5) {
    minCommentsCount.textContent = numberOfComments;
  } else {
    minCommentsCount.textContent = 5;
  } //Проверяю, сколько комментов, если меньше 5, то записываю количество комментов в самостоятельно добавленный спан с классом .min-count
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
    fillData(localPicElement); //раньше все кончалось на этом.

    if (localPicElement.comments.length <= 5) {
      createComments(localPicElement.comments);
      commentLoader.classList.add('hidden'); //если комментов меньше пяти, то просто отрисовывается, как обычно, и кнопки "Загрузить ещё" нет.
    } else {
      commentLoader.classList.remove('hidden');
      let commentsPortion = 5;
      let loadedComments = localPicElement.comments.slice(0, commentsPortion);
      createComments(loadedComments);

      commentLoader.addEventListener('click', () => {
        commentsPortion += 5;
        loadedComments = localPicElement.comments.slice(0, commentsPortion);
        createComments(loadedComments);
        minCommentsCount.textContent = loadedComments.length;
      });
    } //я чувствую, что тут полная каша, и принцип DRY видит это и рыдает, но пока мне не приходит в голову, как это исправить. Время поджимает, заданное в дз этот код делает, так что сдаю, что есть... >_<
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
