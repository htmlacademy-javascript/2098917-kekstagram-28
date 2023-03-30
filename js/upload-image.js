import { bodyTag } from './big-picture.js';
import { isEscapeKey } from './util.js';
import {setScale, DEAFULT_SCALE} from './img-scale.js';

const HASHTAGS_MAX_AMOUNT = 5;
const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const imgLoader = document.querySelector('.img-upload__overlay');
const cancelUpload = document.querySelector('.img-upload__cancel');
const imgInput = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imgUploadForm.querySelector('#hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

//Открытие и закрытие формы загрузки
function onImgLoaderEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgLoader();
  }
}

const openImgLoader = () => {
  imgLoader.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  document.addEventListener('keydown', onImgLoaderEscKeydown);
};

function closeImgLoader () {
  imgInput.textContent = '';
  hashtagInput.textContent = '';
  commentInput.textContent = '';
  setScale(DEAFULT_SCALE);
  bodyTag.classList.remove('modal-open');
  imgLoader.classList.add('hidden');
  document.removeEventListener('keydown', onImgLoaderEscKeydown);
}

const onUploadImg = () => {
  openImgLoader();
};

imgInput.addEventListener('change', () => {
  onUploadImg();
});

cancelUpload.addEventListener('click', () => {
  closeImgLoader();
});

hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onImgLoaderEscKeydown);
});

hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onImgLoaderEscKeydown);
});

commentInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onImgLoaderEscKeydown);
});

commentInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onImgLoaderEscKeydown);
});

imgInput.addEventListener('change', onUploadImg);

// Валидация хэштэгов
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

function validateSymbols (tag) {
  return VALID_HASHTAGS.test(tag);
}

function validateAmount (tags) {
  return tags.length <= HASHTAGS_MAX_AMOUNT;
}

function checkRepeats (tags) {
  const lowerCase = tags.map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
}

function validateTags (value) {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  if(validateAmount(tags) && tags.every(validateSymbols) && checkRepeats(tags)) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
    return false;
  }
}

pristine.addValidator(
  hashtagInput,
  validateTags,
  'Хэштег должен начинаться с #, допустимы символы от A до Z, от А до Я <br>в любом регистре, не более 20 символов, не больше 5 уникальных тэгов'
);

// Submit
const onSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    imgUploadForm.submit();
  }
};

imgUploadForm.addEventListener('submit', onSubmit);
