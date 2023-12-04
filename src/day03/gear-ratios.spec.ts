import { GearRatios } from './gear-ratios';

describe('gear ratios', () => {
  const data: string =
    '467..114..\n' +
    '...*......\n' +
    '..35..633.\n' +
    '......#...\n' +
    '617*......\n' +
    '.....+.58.\n' +
    '..592.....\n' +
    '......755.\n' +
    '...$.*....\n' +
    '.664.598..';

  const gearRatios: GearRatios = new GearRatios(data);

  it('should sum the numbers with an adjacent symbol', () => {
    // GIVEN

    // WHEN
    const output: number = gearRatios.partOne();

    // THEN
    expect(output).toBe(4361);
  });

  it('should sum gear ratios', () => {
    // GIVEN

    // WHEN
    const output: number = gearRatios.partTwo();

    // THEN
    expect(output).toBe(467835);
  });
})