//Проверка длины строки
function lengthCheck (string, limit) {
  return string.length <= limit;
}

lengthCheck('проверяемая строка', 20);

//Палиндром
function palindrom (string) {
  let wordBackwards = '';
  for (let i = string.length - 1; i >= 0; i--) {
    wordBackwards += string[i];
  }
  const stringTwo = wordBackwards.toLowerCase();
  return stringTwo === string.toLowerCase();
}

palindrom ('Топот');


//Палиндром с пробелами. Он работает и с обычными словами тоже.
function palindromWithBreaks (string) {
  const stringNoBreaks = string.replaceAll(' ', '');
  let wordBackwards = '';
  for (let i = stringNoBreaks.length - 1; i >= 0; i--) {
    wordBackwards += stringNoBreaks[i];
  }
  const stringTwo = wordBackwards.toLowerCase();
  return stringTwo === stringNoBreaks.toLowerCase();
}

palindromWithBreaks ('А роза упала на лапу Азора');


//Извлечение цифр из строки
function pickOutNumbers (string) {
  let numbers = '';
  for (let i = 0; i <= string.length; i++) {
    if (!isNaN(string[i])) {
      numbers += string[i];
    }
  }
  const onlyNumbers = (numbers.replaceAll(' ', ''));
  return parseInt(onlyNumbers, 10);
}

pickOutNumbers ('ECMAScript 2022');


//Формирование строки

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  return actualPad <= 0
    ? string
    : pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('q', 4, 'werty');
