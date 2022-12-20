import { FormControl, ValidatorFn } from '@angular/forms';

export function restrictedWords(words: string[]): ValidatorFn {
    return (control: FormControl) => {
      if (!words) { return null; }

      const invalidWords = words
        .map(word => control.value.includes(word) ? word : null)
        .filter(word => word);

      return (invalidWords && invalidWords.length > 0)
        ? { restrictedWords: invalidWords.join(', ') }
        : null;
    };
  }
