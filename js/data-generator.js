import { getRandomInteger } from './util.js';
import { getRandomArrayElement } from './util.js';
import { createUniqueId } from './util.js';

const URL_COUNT = 25;
const COMMENT_ID = 500;
const COMMENT_COUNT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const PHOTO_ID = 25;

const COMMENT_AVATARS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];
const COMMENT_MSGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAMES = [
  'Максим',
  'Валера',
  'Саша',
  'Руслан',
  'Олег',
  'Женя',
  'Арина',
  'Алиса',
  'Лолита',
  'Лиза',
];

const photoId = createUniqueId(1, PHOTO_ID);
const photoUrl = createUniqueId(1, URL_COUNT);
const commentId = createUniqueId(1, COMMENT_ID);

const createComment = () => ({
  id: commentId(),
  avatar: getRandomArrayElement(COMMENT_AVATARS),
  message: getRandomArrayElement(COMMENT_MSGS),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const PHOTO_DESCRIPTIONS = [
  'Выложила новую работу, оцените! #рисунок #акварель',
  'Долгожданный отпуск! #море',
  'Новое приобретение #мода',
  'Живу свою лучшую жизнь #кайф #радость',
  'Отмечаем день рождение! #праздник #мечтысбываются',
  'Где я окажусь завтра, не знаю, но сегодня всё прекрасно #такдержать',
  'Воскресный завтрак #еда',
  'Давно не выкладывала своих фото #себяшка',
];

const createPhotoCard = () => {
  const getRandomCommentCount = getRandomInteger(1, COMMENT_COUNT);
  return {
    id: photoId(),
    url: `photos/${photoUrl()}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomCommentCount}, createComment),
  };
};

export { createPhotoCard, PHOTO_ID };
