import {getRandomArrayElement} from "../js/util.js";
import {commentId} from "../js/data.js";

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

const createComment = () => ({
  id: commentId(),
  avatar: getRandomArrayElement(COMMENT_AVATARS),
  message: getRandomArrayElement(COMMENT_MSGS),
  name: getRandomArrayElement(COMMENT_NAMES),
});

export { createComment };
