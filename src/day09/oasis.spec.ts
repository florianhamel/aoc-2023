import { Oasis, OasisBefore } from './oasis';

describe('oasis', () => {
  it('should return the sum of the extrapolations', () => {
    // GIVEN
    const oasis: Oasis = new Oasis();

    // WHEN
    const output: number = oasis.solve(
      '0 3 6 9 12 15\n' +
      '1 3 6 10 15 21\n' +
      '10 13 16 21 30 45'
    );

    // THEN
    expect(output).toBe(114);
  });

  it('should return the sum of the extrapolations', () => {
    // GIVEN
    const oasisBefore: OasisBefore = new OasisBefore();

    // WHEN
    const output: number = oasisBefore.solve(
      '0 3 6 9 12 15\n' +
      '1 3 6 10 15 21\n' +
      '10 13 16 21 30 45'
    );

    // THEN
    expect(output).toBe(2);
  });
});