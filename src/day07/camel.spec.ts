import { Camel } from './camel';

describe('camel', () => {
  const data: string =
    '32T3K 765\n' +
    'T55J5 684\n' +
    'KK677 28\n' +
    'KTJJT 220\n' +
    'QQQJA 483';

  const camel: Camel = new Camel(data);

  it('should sum the bids multiplied by their rank', () => {
    // GIVEN
    // WHEN
    const output: number = camel.partOne();

    // THEN
    expect(output).toBe(6440);
  });

  // it('', () => {
  //   // GIVEN
  //   // WHEN
  //   const output: number = camel.partTwo();
  //
  //   // THEN
  //   expect(output).toBe();
  // });
});