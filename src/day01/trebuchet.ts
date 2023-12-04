import { PuzzleInputReader } from '../utils/puzzle-input-reader';

export class Trebuchet {
  readonly substitutes: Map<string, string> = new Map<string, string>([
    [ 'one', 'o1e' ],
    [ 'two', 't2o' ],
    [ 'three', 't3e' ],
    [ 'four', 'f4r' ],
    [ 'five', 'f5e' ],
    [ 'six', 's6x' ],
    [ 'seven', 's7n' ],
    [ 'eight', 'e8t' ],
    [ 'nine', 'n9e' ],
  ]);

  solve(): any {
    PuzzleInputReader.getPuzzleInput('./puzzle-input.txt.txt').then(data => {
      console.log('part 1:', this.partOne(data));
      console.log('part 2:', this.partTwo(data));
    });
  }

  partOne(data: string): number {
    let sum: number = 0;
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      const firstAndLast: string[] = this.getFirstAndLast(line);
      sum += parseInt(firstAndLast[0] + firstAndLast[1]);
    });
    return sum;
  }

  partTwo(data: string): number {
    let sum: number = 0;
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      let replacedLine = line;
      this.substitutes.forEach((value, key) => {
        replacedLine = replacedLine.replace(new RegExp(`${key}`, 'g'), value);
      });
      const firstAndLast: string[] = this.getFirstAndLast(replacedLine);
      sum += parseInt(firstAndLast[0] + firstAndLast[1]);
    });
    return sum;
  }

  private getFirstAndLast(line: string): string[] {
    const match: string[] = line.match(/[1-9]/g)!;
    return [match.at(0)!, match.at(match.length - 1)!];
  }
}

new Trebuchet().solve();