import { bodyTag } from './big-picture.js';
import { isEscapeKey } from './util.js';
import { setScale, DEAFULT_SCALE } from './img-scale.js';
import { sendData } from './api.js';
import { imgPreview } from './img-scale.js';
import { updateSliderSettings, defaultFilter, hideSlider } from './filters.js';

const HASHTAGS_MAX_AMOUNT = 5;
const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const imgLoader = document.querySelector('.img-upload__overlay');
const cancelUpload = document.querySelector('.img-upload__cancel');
const imgInput = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imgUploadForm.querySelector('#hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const defaultEffect = document.querySelector('#effect-none');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

//Подстановка загруженного изображения вместо превью
const getImage = () => {
  const file = imgInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

imgInput.addEventListener('change', getImage);

// Открытие/закрытие окна об успешной загрузке фото
const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessFragment();
  }
};

function onClickAwaySuccess (evt) {
  const windowSuccess = document.querySelector('.success');
  if(evt.target === windowSuccess) {
    removeSuccessFragment();
  }
}

function removeSuccessFragment () {
  const findFragment = document.querySelector('.success');
  document.querySelector('.success__button').removeEventListener('click', removeSuccessFragment);
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onClickAwaySuccess);
  findFragment.remove();
}

const showUploadSuccess = () => {
  const successWindow = successTemplate.cloneNode(true);
  bodyTag.appendChild(successWindow);
  document.querySelector('.success__button').addEventListener('click', removeSuccessFragment);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onClickAwaySuccess);
};

// Открытие/закрытие окна об ошибке загрузки фото
const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorFragment();
  }
};

function onClickAwayError (evt) {
  const windowError = document.querySelector('.error');
  if(evt.target === windowError) {
    removeErrorFragment();
  }
}

function removeErrorFragment () {
  const findFragment = document.querySelector('.error');
  document.querySelector('.error__button').removeEventListener('click', removeErrorFragment);
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onClickAwayError);
  document.addEventListener('keydown', onImgLoaderEscKeydown);
  findFragment.remove();
}

const showUploadError = (message) => {
  const errorWindow = errorTemplate.cloneNode(true);
  errorWindow.querySelector('.error__text').textContent = message;
  bodyTag.appendChild(errorWindow);
  document.querySelector('.error__button').addEventListener('click', removeErrorFragment);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onClickAwayError);
  document.removeEventListener('keydown', onImgLoaderEscKeydown);
};

// Отправка фото
const setPhotoSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showUploadSuccess();
        })
        .catch((err) => {
          showUploadError(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { setPhotoSubmit, openImgLoader, closeImgLoader, showUploadSuccess };
