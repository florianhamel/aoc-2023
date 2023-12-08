import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IDestination {
  left: string;
  right: string;
}

export class Storm {
  readonly instructions: string[];
  readonly map: Map<string, IDestination>;

  constructor(data: string) {
    const tokens: string[] = data.split('\n\n');
    this.instructions = this.getInstructions(tokens.at(0)!);
    this.map = this.getMap(tokens.at(1)!.split('\n'));
  }

  private getInstructions(instructionsToken: string): string[] {
    return [...instructionsToken].map(token => (token === 'L') ? 'left' : 'right');
  }

  private getMap(destinationTokens: string[]): Map<string, IDestination> {
    const map: Map<string, IDestination> = new Map<string, IDestination>();
    destinationTokens.forEach(token => {
      const matches: string[] = token.match(/[A-Z]{3}/g) as string[];
      map.set(matches.at(0)!, { left: matches.at(1)!, right: matches.at(2)! });
    });
    return map;
  }

  partOne(): number {
    let count: number = 0;
    let index: number = 0;
    let position: string = 'AAA';
    while (position !== 'ZZZ') {
      ++count;
      const destination = this.map.get(position)! as any;
      const instruction: string = this.instructions.at(index)!;
      position = destination[instruction];
      index = (index === this.instructions.length - 1) ? 0 : index + 1;
    }
    return count;
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const storm: Storm = new Storm(data);
  console.log(storm.partOne());
});
