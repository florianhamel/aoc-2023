import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

abstract class AbstractOasis {

  solve(data: string): number {
    const sequences: number[][] = this.getSequences(data);
    let sum: number = 0;
    sequences.forEach(sequence => {
      sum += this.getExtrapolation(sequence);
    });
    return sum;
  }

  protected getExtrapolation(sequence: number[]): number {
    const diffSequences: number[][] = [sequence];
    let currSequence: number[] = sequence;
    while (currSequence.some(nbr => nbr !== 0)) {
      currSequence = currSequence.map((nbr, index) =>
        (index < currSequence.length - 1) ? currSequence[index + 1] - nbr : 0)
        .slice(0, currSequence.length - 1);
      diffSequences.push(currSequence);
    }
    return this.extrapolate(diffSequences);
  }

  protected abstract extrapolate(diffSequences: number[][]): number;

  private getSequences(data: string): number[][] {
    return data.split('\n').map(history => history.split(' ')
      .map(nbr => parseInt(nbr)));
  }
}

export class Oasis extends AbstractOasis {
  protected extrapolate(diffSequences: number[][]): number {
    return diffSequences.reduceRight((extrapolation, diffSequence) =>
      diffSequence[diffSequence.length - 1] + extrapolation, 0);
  }

}

export class OasisBefore extends AbstractOasis {
  protected extrapolate(diffSequences: number[][]): number {
    return diffSequences.reduceRight((extrapolation, diffSequence) =>
      diffSequence[0] - extrapolation, 0);
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const oasis: Oasis = new Oasis();
  const oasisBefore: OasisBefore = new OasisBefore();
  console.log(oasis.solve(data));
  console.log(oasisBefore.solve(data));
});