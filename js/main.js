import { closeImgLoader, setPhotoSubmit } from './upload-image.js';
import { renderMiniPhotos, showFilters, sortPhotos } from './minis-generator.js';
import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import './img-scale.js';
import './filters.js';

getData()
  .then((photosFromServer) => {
    renderMiniPhotos(photosFromServer);
    showFilters();
    sortPhotos(photosFromServer);
    openBigPicture(photosFromServer);
  });

setPhotoSubmit(closeImgLoader);
