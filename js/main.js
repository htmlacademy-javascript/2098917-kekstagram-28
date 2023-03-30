import './minis-generator.js';
import { onMiniPicClick } from './big-picture.js';
import { picturesContainer } from './big-picture.js';
import './upload-image.js';
import './img-scale.js';

picturesContainer.addEventListener('click', onMiniPicClick);
