import { GhostStorm, Storm } from './storm';

describe('storm', () => {
  it('should return the number of instructions needed to get to ZZZ', () => {
    // GIVEN
    const storm: Storm = new Storm();

    // WHEN
    const output1: number = storm.solve(
      'RL\n' +
      '\n' +
      'AAA = (BBB, CCC)\n' +
      'BBB = (DDD, EEE)\n' +
      'CCC = (ZZZ, GGG)\n' +
      'DDD = (DDD, DDD)\n' +
      'EEE = (EEE, EEE)\n' +
      'GGG = (GGG, GGG)\n' +
      'ZZZ = (ZZZ, ZZZ)'
    );
    const output2: number = storm.solve(
      'LLR\n' +
      '\n' +
      'AAA = (BBB, BBB)\n' +
      'BBB = (AAA, ZZZ)\n' +
      'ZZZ = (ZZZ, ZZZ)'
    );

    // THEN
    expect(output1).toBe(2);
    expect(output2).toBe(6);
  });

  it('should return the number of instructions needed to get to XXZ', () => {
    // GIVEN
    const ghostStorm: GhostStorm = new GhostStorm();

    // WHEN
    const output = ghostStorm.solve(
      'LR\n' +
      '\n' +
      '11A = (11B, XXX)\n' +
      '11B = (XXX, 11Z)\n' +
      '11Z = (11B, XXX)\n' +
      '22A = (22B, XXX)\n' +
      '22B = (22C, 22C)\n' +
      '22C = (22Z, 22Z)\n' +
      '22Z = (22B, 22B)\n' +
      'XXX = (XXX, XXX)'
    );

    // THEN
    expect(output).toBe(6);
  });
});