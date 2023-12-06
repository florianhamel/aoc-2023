import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IRace {
  time: number;
  distance: number;
}

export class Race {
  readonly lines: string[];

  constructor(data: string) {
    this.lines = data.split('\n');
  }

  partOne(): number {
    const races: IRace[] = this.getRaces();
    return races.reduce((wins, race) => wins * this.getWinsCount(race), 1);
  }

  /* solving the following equation: n * (time - n) > distance
   * is actually solving: -x^2 + t0x - d0 > 0 | a = -1, b = t0 and c = -d0
   */
  partTwo(): number {
    const race: IRace = this.getBigRace();
    const delta: number = this.getDelta(race);
    const solutions: number[] = this.getSolutions(race, delta);
    return solutions.at(1)! - solutions.at(0)! + 1;
  }

  private getDelta(race: IRace): number {
    return (Math.pow(race.time, 2) - (4 * (-1) * (-race.distance)));
  }

  private getSolutions(race: IRace, delta: number): number[] {
    return [
      Math.ceil((-race.time + Math.sqrt(delta)) / -2),
      Math.floor((-race.time - Math.sqrt(delta)) / -2)
    ];
  }

  private getBigRace(): IRace {
    return {
      time: parseInt(this.extractNumbers(this.lines.at(0)!).join('')),
      distance: parseInt(this.extractNumbers(this.lines.at(1)!).join(''))
    };
  }

  private getRaces(): IRace[] {
    const times: number[] = this.extractNumbers(this.lines.at(0)!).map(number => parseInt(number));
    const distances: number[] = this.extractNumbers(this.lines.at(1)!).map(number => parseInt(number));
    const races: IRace[] = [];
    for (let i = 0; i < times.length && i < distances.length; ++i) {
      races.push({
        time: times.at(i)!,
        distance: distances.at(i)!
      });
    }
    return races;
  }

  private extractNumbers(line: string): string[] {
    return line.split(':').at(1)!.split(' ').filter(time => time !== '');
  }

  private getWinsCount(race: IRace): number {
    let winsCount: number = 0;
    for (let i = 0; i < race.time; ++i) {
      if (i * (race.time - i) > race.distance) {
        ++winsCount;
      }
    }
    return winsCount;
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const race: Race = new Race(data);
  console.log(race.partOne());
  console.log(race.partTwo());
});