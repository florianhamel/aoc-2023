import { Storm } from './storm';

describe('storm', () => {
  const data1: string =
    'RL\n' +
    '\n' +
    'AAA = (BBB, CCC)\n' +
    'BBB = (DDD, EEE)\n' +
    'CCC = (ZZZ, GGG)\n' +
    'DDD = (DDD, DDD)\n' +
    'EEE = (EEE, EEE)\n' +
    'GGG = (GGG, GGG)\n' +
    'ZZZ = (ZZZ, ZZZ)';

  const data2: string =
    'LLR\n' +
    '\n' +
    'AAA = (BBB, BBB)\n' +
    'BBB = (AAA, ZZZ)\n' +
    'ZZZ = (ZZZ, ZZZ)'

  it('should return the number of instructions needed to get to ZZZ', () => {
    // GIVEN
    const storm1: Storm = new Storm(data1);
    const storm2: Storm = new Storm(data2);

    // WHEN
    const output1 = storm1.partOne();
    const output2 = storm2.partOne();

    // THEN
    expect(output1).toBe(2);
    expect(output2).toBe(6);
  });
});