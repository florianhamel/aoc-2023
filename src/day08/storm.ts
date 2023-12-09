import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IDestination {
  left: string;
  right: string;
}

abstract class AbstractStorm {
  solve(data: string): number {
    const tokens: string[] = data.split('\n\n');
    const instructions: string[] = this.getInstructions(tokens.at(0)!);
    const map: Map<string, IDestination> = this.getMap(tokens.at(1)!.split('\n'));
    return this.getDistance(instructions, map);
  }

  protected abstract getDistance(instructions: string[], map: Map<string, IDestination>): number;

  protected getInstructions(instructionsToken: string): string[] {
    return [...instructionsToken].map(token => (token === 'L') ? 'left' : 'right');
  }

  protected getMap(destinationTokens: string[]): Map<string, IDestination> {
    const map: Map<string, IDestination> = new Map<string, IDestination>();
    destinationTokens.forEach(token => {
      const matches: string[] = token.match(/[0-9A-Z]{3}/g) as string[];
      map.set(matches.at(0)!, { left: matches.at(1)!, right: matches.at(2)! });
    });
    return map;
  }

}

export class Storm extends AbstractStorm {
  protected getDistance(instructions: string[], map: Map<string, IDestination>): number {
    let count: number = 0;
    let index: number = 0;
    let position: string = 'AAA';
    while (position !== 'ZZZ') {
      ++count;
      const destination = map.get(position)! as any;
      const instruction: string = instructions.at(index)!;
      position = destination[instruction];
      index = (index === instructions.length - 1) ? 0 : index + 1;
    }
    return count;
  }
}

export class GhostStorm extends AbstractStorm {
  protected getDistance(instructions: string[], map: Map<string, IDestination>): number {
    let lengths: number[] = [...map.keys()].filter(key => /..A/.test(key)).map(position =>
      this.getLoopLength(position, instructions, map));
    return lengths.reduce((lcm, length) => this.lcm(lcm, length));
  }

  private getLoopLength(position: string, instructions: string[], map: Map<string, IDestination>): number {
    let count: number = 0;
    while (!/..Z/.test(position)) {
      const destination: IDestination = map.get(position)!;
      const instruction: string = instructions.at(count % instructions.length)!;
      position = (destination as any)[instruction];
      ++count;
    }
    return count;
  }

  private lcm(a: number, b: number): number {
    return a * b / this.gcd(a, b);
  }

  private gcd(a: number, b: number): number {
    console.log('a', a, 'b', b);
    if (b === 0) return a;
    return this.gcd(b, a % b);
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const storm: Storm = new Storm();
  const ghostStorm: GhostStorm = new GhostStorm();
  console.log(storm.solve(data));
  console.log(ghostStorm.solve(data));
});
