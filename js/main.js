import { closeImgLoader, setPhotoSubmit } from './upload-image.js';
import { renderMiniPhotos, showFilters, sortPhotos } from './minis-generator.js';
import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './img-scale.js';
import './filters.js';

getData()
  .then((photosFromServer) => {
    renderMiniPhotos(photosFromServer);
    showFilters();
    sortPhotos(photosFromServer);
    openBigPicture(photosFromServer);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setPhotoSubmit(closeImgLoader);
