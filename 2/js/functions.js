//Проверка длины строки
function lengthCheck (string, limit) {
  let resultOne = '';
  if(string.length <= limit) {
    resultOne = 'Результат: true - строка проходит по длине';
  } else {
    resultOne = 'Результат: false — строка не проходит';
  }
  return resultOne;
}

lengthCheck('проверяемая строка', 20);

//Палиндром
function palindrom (string) {
  let wordBackwards = '';
  for (let i = string.length - 1; i >= 0; i--) {
    wordBackwards += string[i];
  }
  const stringTwo = wordBackwards.toLowerCase();
  let resultTwo = '';
  if(stringTwo === string.toLowerCase()) {
    resultTwo = 'Это палиндром!';
  } else {
    resultTwo = 'Это не палиндром!';
  }
  return resultTwo;
}

palindrom ('Топот');


//Палиндром с пробелами
function palindromWithBreaks (string) {
  const stringNoBreaks = string.replaceAll(' ', '');
  let wordBackwards = '';
  for (let i = stringNoBreaks.length - 1; i >= 0; i--) {
    wordBackwards += stringNoBreaks[i];
  }
  const stringTwo = wordBackwards.toLowerCase();
  let resultThree = '';
  if(stringTwo === stringNoBreaks.toLowerCase()) {
    resultThree = 'Это палиндром!';
  } else {
    resultThree = 'Это не палиндром!';
  }
  return resultThree;
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
function formString(originalString, total, additions) {
  let resultFour = '';
  const basicLength = parseInt(originalString.length, 10);
  if (basicLength >= total) {
    resultFour = originalString;
  } else if (basicLength < total) {
    const symbolsToAdd = total - parseInt(originalString.length, 10);
    if (parseInt(additions.length, 10) > symbolsToAdd) {
      let addedSyms = '';
      for (let i = 0; i < symbolsToAdd; i++) {
        addedSyms += additions[i];
      }
      resultFour = addedSyms + originalString;
    } else if (parseInt(additions.length, 10) <= symbolsToAdd) {
      const symDifference = symbolsToAdd - parseInt(additions.length, 10);
      let addedSymsToAddedSyms = '';
      for (let i = 0; i < symDifference; i++) {
        addedSymsToAddedSyms += additions[0];
      }
      resultFour = addedSymsToAddedSyms + additions + originalString;
    }
  }
  return resultFour;
}

formString('qwerty', 4, '0');
