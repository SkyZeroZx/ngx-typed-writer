/**
 * The function `typeHtmlChars` is used to skip over HTML characters in a string if the `isHTML` flag
 * is set to true.
 * @param {boolean} isHTML - A boolean value indicating whether the current string contains HTML
 * characters.
 * @param {string} currentString - The current string that needs to be processed. It can contain HTML
 * characters that need to be skipped over.
 * @param {number} currentStringPosition - The current position in the string that is being processed.
 * @returns the updated value of `currentStringPosition`.
 */
export function typeHtmlChars(
  isHTML: boolean,
  currentString: string,
  currentStringPosition: number
): number {
  if (!isHTML) return currentStringPosition;
  const currentCharacter = currentString
    .substring(currentStringPosition)
    .charAt(0);
  if (currentCharacter === '<' || currentCharacter === '&') {
    let endTag = '';
    if (currentCharacter === '<') {
      endTag = '>';
    } else {
      endTag = ';';
    }
    while (
      currentString.substring(currentStringPosition + 1).charAt(0) !== endTag
    ) {
      currentStringPosition++;
      if (currentStringPosition + 1 > currentString.length) {
        break;
      }
    }
    currentStringPosition++;
  }

  return currentStringPosition;
}

/**
 * The function `backSpaceHtmlChars` is a function that takes in a boolean `isHTML`, a
 * string `currentString`, and a number `currentStringPosition`, and returns a new number representing
 * the updated `currentStringPosition` after removing HTML characters.
 * @param {boolean} isHTML - A boolean value indicating whether the current string contains HTML
 * characters or not.
 * @param {string} currentString - The `currentString` parameter is a string that represents the
 * current text or HTML content.
 * @param {number} currentStringPosition - The current position within the current string.
 * @returns the updated value of `currentStringPosition`.
 */
export function backSpaceHtmlChars(
  isHTML: boolean,
  currentString: string,
  currentStringPosition: number
): number {
  if (!isHTML) return currentStringPosition;
  const currentCharacter = currentString
    .substring(currentStringPosition)
    .charAt(0);
  if (currentCharacter === '>' || currentCharacter === ';') {
    let endTag = '';
    if (currentCharacter === '>') {
      endTag = '<';
    } else {
      endTag = '&';
    }
    while (
      currentString.substring(currentStringPosition - 1).charAt(0) !== endTag
    ) {
      currentStringPosition--;
      if (currentStringPosition < 0) {
        break;
      }
    }
    currentStringPosition--;
  }
  return currentStringPosition;
}


/**
 * The function `shuffleStringsIfNeeded` shuffles an array of strings if a boolean flag is set to true,
 * otherwise it returns the original array.
 * @param {boolean} shuffle - A boolean value indicating whether the strings should be shuffled or not.
 * @param {string[]} strings - An array of strings that need to be shuffled if the `shuffle` parameter
 * is set to `true`.
 * @returns an array of strings. If the `shuffle` parameter is `false`, it returns the original
 * `strings` array. If `shuffle` is `true`, it returns a shuffled version of the `strings` array.
 */
export function shuffleStringsIfNeeded(
  shuffle: boolean,
  strings: string[]
): string[] {
  if (!shuffle) return strings;
  return strings.sort(() => Math.random() - 0.5);
}
