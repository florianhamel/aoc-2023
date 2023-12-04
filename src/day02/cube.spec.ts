import { describe } from '@jest/globals';
import { Cube } from './cube';

describe('cube', () => {
  const cube: Cube = new Cube();
  const data: string = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';

  it('should sum the ids of possible outcomes', () => {
    // GIVEN

    // WHEN
    const sum: number = cube.partOne(data);

    // THEN
    expect(sum).toBe(8);
  });

  it('should sum the powers of the fewest number of cubes needed per game', () => {
    // GIVEN

    // WHEN
    const sum: number = cube.partTwo(data);

    // THEN
    expect(sum).toBe(2286);
  });
});