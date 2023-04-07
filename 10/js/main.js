import { closeImgLoader, setPhotoSubmit } from './upload-image.js';
import { renderMiniPhotos } from './minis-generator.js';
import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import './img-scale.js';
import './filters.js';

getData()
  .then((photos) => {
    renderMiniPhotos(photos);
    openBigPicture(photos);
  });

setPhotoSubmit(closeImgLoader);
