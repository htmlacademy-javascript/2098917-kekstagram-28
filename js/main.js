import { createPhotoCard } from './photo-set-gen.js';

const PHOTO_ID = 25;

const photoSet = Array.from({length: PHOTO_ID}, createPhotoCard);
photoSet();
