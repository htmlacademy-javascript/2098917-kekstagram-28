import { createUniqueId } from "../js/util.js";

const URL_COUNT = 25;
const COMMENT_ID = 200;
const PHOTO_ID = 25;

const photoId = createUniqueId(1, PHOTO_ID);
const photoUrl = createUniqueId(1, URL_COUNT);
const commentId = createUniqueId(1, COMMENT_ID);

export {photoId};
export {photoUrl};
export {commentId};
