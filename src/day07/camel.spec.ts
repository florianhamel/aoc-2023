import { Camel, CamelJoker } from './camel';

describe('camel', () => {
  const data: string =
    '32T3K 765\n' +
    'T55J5 684\n' +
    'KK677 28\n' +
    'KTJJT 220\n' +
    'QQQJA 483';


  it('should sum the bids multiplied by their rank', () => {
    // GIVEN
    const camel: Camel = new Camel(data);

    // WHEN
    const output: number = camel.solve();

    // THEN
    expect(output).toBe(6440);
  });

  it('should sum the bids multiplied by their rank but J is Joker', () => {
    // GIVEN
    const camelJoker: CamelJoker = new CamelJoker(data);

    // WHEN
    const output: number = camelJoker.solve();

    // THEN
    expect(output).toBe(5905);
  });
});