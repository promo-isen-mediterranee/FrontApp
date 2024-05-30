import { Pipe, PipeTransform } from '@angular/core';

export interface SpecialCharactersMap {
  [accented: string]: string;
}

@Pipe({
  name: 'removeSpecialCharacters',
  standalone: true,
})
export class RemoveSpecialCharactersPipe implements PipeTransform {
  private specialCharacters: SpecialCharactersMap = {
    à: 'a',
    ç: 'c',
    ê: 'e',
    é: 'e',
    è: 'e',
    ï: 'i',
    ô: 'o',
    ' ': '-',
  };

  transform(value: string, ...args: unknown[]): string {
    return value.replace(
      new RegExp(Object.keys(this.specialCharacters).join('|'), 'g'),
      (match) => this.specialCharacters[match],
    );
  }
}
