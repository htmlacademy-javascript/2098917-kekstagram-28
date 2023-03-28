import './minis-generator.js';
import { onMiniPicClick } from './big-picture.js';
import { picturesContainer } from './big-picture.js';

import {imgInput, onUploadImg, imgUploadForm, onSubmit} from './upload-image.js';


picturesContainer.addEventListener('click', onMiniPicClick);
imgInput.addEventListener('change', onUploadImg);
imgUploadForm.addEventListener('submit', onSubmit);

