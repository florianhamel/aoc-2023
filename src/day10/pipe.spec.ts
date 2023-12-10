import { Pipe } from './pipe';

describe('oasis', () => {
  it('should return the sum of the extrapolations', () => {
    // GIVEN
    const pipe: Pipe = new Pipe();

    // WHEN
    const output: number = pipe.solve(
      '..F7.\n' +
      '.FJ|.\n' +
      'SJ.L7\n' +
      '|F--J\n' +
      'LJ...'
    );

    // THEN
    expect(output).toBe(8);
  });


});