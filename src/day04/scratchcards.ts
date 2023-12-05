import { PuzzleInputReader } from '../utils/puzzle-input-reader';

export class Scratchcards {
  readonly lines: string[];
  readonly winning = 0;
  readonly scratched = 1;

  constructor(data: string) {
    this.lines = data.split('\n');
  }

  partOne(): number {
    let sum: number = 0;
    this.lines.forEach(line => {
      const winningNumbers: string[] = this.getNumbers(line, this.winning);
      const scratchedNumbers: string[] = this.getNumbers(line, this.scratched);
      const intersection: string[] = scratchedNumbers.filter(nbr => winningNumbers.includes(nbr));
      sum += intersection.reduce(points => (points !== 0) ? points * 2 : 1, 0);
    });
    return sum;
  }

  partTwo(): number {
    return this.processScratchcards(this.lines);
  }

  private processScratchcards(lines: string[]): number {
    let sum: number = lines.length;
    lines.forEach(line => {
      const id: number = this.getId(line);
      const winningNumbers: string[] = this.getNumbers(line, this.winning);
      const scratchedNumbers: string[] = this.getNumbers(line, this.scratched);
      const intersection: string[] = scratchedNumbers.filter(nbr => winningNumbers.includes(nbr));
      const copiedScratchcards: string[] = this.getCopiedLines(intersection.length, id);
      sum += this.processScratchcards(copiedScratchcards);
    });
    return sum;
  }

  private getId(line: string): number {
    return parseInt(line.split(':').at(0)!.split(' ')
      .filter(elem => elem !== '').at(1)!) ?? -1;
  }

  private getCopiedLines(length: number, id: number): string[] {
    return this.lines.slice(id, id + length);
  }

  private getNumbers(line: string, index: 0 | 1): string[] {
    return this.getRawNumbers(line, index).split(' ').filter(nbr => nbr !== '') ?? [];
  }

  private getRawNumbers(line: string, index: 0 | 1): string {
    return line.split(':').at(1)?.split('|').at(index)?.trim() ?? '';
  }
}

PuzzleInputReader.getPuzzleInput('./puzzle-input.txt').then(data => {
  const scratchcards: Scratchcards = new Scratchcards(data);
  console.log(scratchcards.partOne());
  console.log(scratchcards.partTwo());
});
