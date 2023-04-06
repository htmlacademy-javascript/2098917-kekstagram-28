import { closeImgLoader, setPhotoSubmit } from './upload-image.js';
import { renderMiniPhotos } from './minis-generator.js';
import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import './upload-image.js';
import './img-scale.js';
import './filters.js';
import './api.js';

getData()
  .then((photos) => {
    renderMiniPhotos(photos);
    openBigPicture(photos);
  });

setPhotoSubmit(closeImgLoader);
