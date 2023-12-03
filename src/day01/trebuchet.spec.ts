import { describe, it } from '@jest/globals';
import { Trebuchet } from './trebuchet';

describe('partOne', () => {
  const trebuchet: Trebuchet = new Trebuchet();

  it('should work with numerics', () => {
    // GIVEN
    const data: string = '1abc2\n' +
      'pqr3stu8vwx\n' +
      'a1b2c3d4e5f\n' +
      'treb7uchet\n' +
      'ksdf3445asdkjfaks9324\n' +
      '4ksdf3445asdkjfaks93242baruchruch\n' +
      'spinonok1sdf3445asdkjfaks94\n' +
      '099934950234500\n' +
      '999934950234509\n' +
      '79993495nerium0234507';

    // WHEN
    const output: number = trebuchet.partOne(data);

    // THEN
    expect(output).toBe(503);
  });
});

describe('partTwo', () => {
  const trebuchet: Trebuchet = new Trebuchet();

  it('should work with literals and numerics', () => {
    // GIVEN
    const data: string = 'two1nine\n' +
      'eightwothree\n' +
      'abcone2threexyz\n' +
      'xtwone3four\n' +
      '4nineeightseven2\n' +
      'zoneight234\n' +
      '7pqrstsixteen\n' +
      'oneight';

    // WHEN
    const output: number = trebuchet.partTwo(data);

    // THEN
    expect(output).toBe(299);
  });
});