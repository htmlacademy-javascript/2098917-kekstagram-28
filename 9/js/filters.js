import {imgPreview} from './img-scale.js';
import {imgUploadForm} from './upload-image.js';

const FILTERS = [
  {
    name: 'none',
    filter: 'none',
    range: {
      min: 1,
      max: 100,
    },
    start: 1,
    step: 1,
    connect: 'lower',
    unit: '',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    unit: '',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  {
    name: 'sepia',
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    unit: '',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  {
    name: 'marvin',
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    unit: '%',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  {
    name: 'phobos',
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    unit: 'px',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  },
  {
    name: 'heat',
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    unit: '',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  }];

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.effect-level');
const sliderInput = document.querySelector('.effect-level__value');

const defaultFilter = FILTERS[0];
let selectedFilter;

const hideSlider = function () {
  sliderContainer.classList.add('hidden');
};

const showSlider = function () {
  sliderContainer.classList.remove('hidden');
};

const updateSlider = function (value) {
  slider.noUiSlider.on('update', () => {
    sliderInput.value = slider.noUiSlider.get();
    imgPreview.style.filter = `${value.filter}(${sliderInput.value}${value.unit})`;
  });
};

const onChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectsId = evt.target.value; //Записали в переменную, по какому фильтру кликнул пользователь
    imgPreview.className = `effects__preview--${effectsId}`; //На изображении поменяли класс на тот, который выбрал пользователь
    selectedFilter = FILTERS.find((element) => element.name === effectsId);// В массиве с фильтрами нашли объект с настройками слайдера для выбранного фильтра
    if (selectedFilter.name !== 'none') {
      showSlider();
      slider.noUiSlider.updateOptions(selectedFilter);
      updateSlider(selectedFilter);
    } else {
      hideSlider();
    }
  }
};

const createSlider = (value) => {
  noUiSlider.create(slider, value);
};

createSlider(defaultFilter);
hideSlider();

imgUploadForm.addEventListener('change', onChange);
