const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEAFULT_SCALE = 100;

const scaleInput = document.querySelector('.scale__control--value');
const scaleMin = document.querySelector('.scale__control--smaller');
const scaleMax = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentInputValue;

const setScale = function (value) {
  scaleInput.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
};

const onZoomOut = function () {
  currentInputValue = parseInt(scaleInput.value, 10);
  if (currentInputValue !== MIN_SCALE){
    let lesserScale = currentInputValue -= SCALE_STEP;
    setScale(lesserScale);
  }
};

const onZoomIn = function () {
  currentInputValue = parseInt(scaleInput.value, 10);
  if (currentInputValue !== MAX_SCALE){
    let biggerScale = currentInputValue += SCALE_STEP;
    setScale(biggerScale);
  }
};

scaleMin.addEventListener('click', onZoomOut);
scaleMax.addEventListener('click', onZoomIn);

export {setScale, DEAFULT_SCALE};
