import {imgPreview} from './img-scale.js';

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
const effectsContainer = document.querySelector('.img-upload__effects');

const defaultFilter = FILTERS[0];
let selectedFilter = defaultFilter;

noUiSlider.create(slider, defaultFilter); //Создали слайдер */

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
  imgPreview.className = 'effects__preview--none';
  imgPreview.style.filter = '';
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

hideSlider(); //Спрятали слайдер

const updateSliderSettings = (settings) => {
  slider.noUiSlider.updateOptions(settings);
};

const onSliderValueUpdate = () => {
  sliderInput.value = slider.noUiSlider.get();
  imgPreview.style.filter = `${selectedFilter.filter}(${sliderInput.value}${selectedFilter.unit})`;
};

//На клик по превью эффекта:
const onChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) { //нашли элемент превью эффекта
    const effectsId = evt.target.value; //Записали в переменную название фильтра, по которому кликнул пользователь
    imgPreview.className = `effects__preview--${effectsId}`; //Добавили большому изображению класс с эффектом, который выбрал пользователь
    selectedFilter = FILTERS.find((element) => element.name === effectsId);// В массиве с фильтрами FILTERS нашли объект с настройками слайдера для выбранного фильтра
    if (selectedFilter.name !== 'none') {
      showSlider();
      updateSliderSettings(selectedFilter);

    } else {
      hideSlider();
    }
    return selectedFilter;
  }
};

slider.noUiSlider.on('update', onSliderValueUpdate);

effectsContainer.addEventListener('change', onChange);

export { updateSliderSettings, defaultFilter, hideSlider };
