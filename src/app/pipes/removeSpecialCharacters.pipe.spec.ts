import { RemoveSpecialCharactersPipe } from './removeSpecialCharacters.pipe';

describe('RemoveSpecialCharactersPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveSpecialCharactersPipe();
    expect(pipe).toBeTruthy();
  });

  it('should remove special characters', () => {
    const pipe = new RemoveSpecialCharactersPipe();
    expect(pipe.transform('à')).toBe('a');
    expect(pipe.transform('garçon')).toBe('garcon');
    expect(pipe.transform('être')).toBe('etre');
    expect(pipe.transform('kakémono')).toBe('kakemono');
    expect(pipe.transform('très')).toBe('tres');
    expect(pipe.transform('Loïc')).toBe('Loic');
    expect(pipe.transform('hôpital')).toBe('hopital');
    expect(pipe.transform('Hello World')).toBe('Hello-World');
  });
});
