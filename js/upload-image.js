import { bodyTag } from './big-picture.js';
import { isEscapeKey } from './util.js';
import { setScale, DEAFULT_SCALE } from './img-scale.js';
import { showAlert } from './util.js';
import { sendData } from './api.js';
import { imgPreview } from './img-scale.js';
import { updateSliderSettings, defaultFilter, hideSlider } from './filters.js';

const HASHTAGS_MAX_AMOUNT = 5;
const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgLoader = document.querySelector('.img-upload__overlay');
const cancelUpload = document.querySelector('.img-upload__cancel');
const imgInput = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imgUploadForm.querySelector('#hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const defaultEffect = document.querySelector('#effect-none');

//Открытие и закрытие формы загрузки
const onImgLoaderEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgLoader();
  }
};

const openImgLoader = () => {
  imgPreview.className = 'effects__preview--none';
  imgLoader.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  hashtagInput.value = '';
  commentInput.value = '';
  document.addEventListener('keydown', onImgLoaderEscKeydown);
};

function closeImgLoader () {
  imgInput.value = '';
  setScale(DEAFULT_SCALE);
  bodyTag.classList.remove('modal-open');
  imgLoader.classList.add('hidden');
  imgPreview.className = 'effects__preview--none';
  imgPreview.style.filter = 'none';
  document.removeEventListener('keydown', onImgLoaderEscKeydown);
  updateSliderSettings(defaultFilter);
  defaultEffect.checked = true;
  hideSlider();
  imgPreview.src = '';
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Валидация хэштэгов
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const validateSymbols = (tag) => VALID_HASHTAGS.test(tag);

const validateAmount = (tags) => tags.length <= HASHTAGS_MAX_AMOUNT;

const checkRepeats = (tags) => {
  const lowerCase = tags.map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

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

const getImage = () => {
  const file = imgInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

imgInput.addEventListener('change', getImage);

// Submit
const setPhotoSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { setPhotoSubmit, openImgLoader, closeImgLoader };
