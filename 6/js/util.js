const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createUniqueId (min, max) {
  const idArray = [];

  return function () {
    let singleId = getRandomInteger(min, max);
    if (idArray.length >= (max - min + 1)) {
      return null;
    }
    while(idArray.includes(singleId)) {
      singleId = getRandomInteger(min, max);
    }
    idArray.push(singleId);
    return singleId;
  };
}

export {createUniqueId, getRandomInteger, getRandomArrayElement};
