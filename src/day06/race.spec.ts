import { Race } from './race';

describe('race', () => {
  const data: string =
    'Time:      7  15   30\n' +
    'Distance:  9  40  200';

  const race: Race = new Race(data);

  it('should get the number of ways one can win per race and multiply the results', () => {
    // GIVEN
    // WHEN
    const output: number = race.partOne();

    // THEN
    expect(output).toBe(288);
  });

  it('should get the number of ways one can win the big race', () => {
    // GIVEN
    // WHEN
    const output: number = race.partTwo();

    // THEN
    expect(output).toBe(71503);
  });
});