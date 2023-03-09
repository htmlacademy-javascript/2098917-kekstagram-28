import { photoId } from "../js/data.js";
import { photoUrl } from "../js/data.js";
import {getRandomInteger} from "../js/util.js";
import { getRandomArrayElement } from "../js/util.js";
import { createComment } from "../js/createComment.js";

const PHOTO_DESCRIPTIONS = [
  'Выложила новую работу, оцените! #рисунок #акварель',
  'Долгожданный отпуск! #море',
  'Новое приобретение #мода',
  'Мой пёсель нашёл нового друга на прогулке! #питомцы #собаки',
  'Испекла тортик маме на День Рождения! #сднемрождения #торт',
  'Сегодня холодно, в кормушку прилетело много птичек #зима #птички',
  'Воскресный завтрак #блинчики',
  'Давно не выкладывала своих фото #себяшка',
];

const COMMENT_COUNT = 10;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const createPhotoCard = () => {
  const getRandomCommentCount = getRandomInteger(1, COMMENT_COUNT);
  return {
    photoId: photoId(),
    photoUrl: `photos/${photoUrl()}.jpg`,
    photoDescription: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    photoLikes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    photoComments: Array.from({length: getRandomCommentCount}, createComment),
  };
};

export { createPhotoCard };
