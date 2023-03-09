import { createPhotoCard } from './photoSetGen.js';

const PHOTO_ID = 25;

const photoSet = Array.from({length: PHOTO_ID}, createPhotoCard);
photoSet();
