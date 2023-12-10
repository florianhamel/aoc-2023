import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IPipe {
  pos: IPos;
  prev?: IPipe;
  next?: IPipe;
}

interface IPos {
  y: number;
  x: number;
}

enum Cardinal {
  North,
  East,
  South,
  West
}

export class Pipe {
  readonly pipesMap: Map<string, string[]> = new Map<string, string[]>([
    ['|', ['North', 'South']],
    ['-', ['East', 'West']],
    ['L', ['North', 'East']],
    ['J', ['North', 'West']],
    ['7', ['South', 'West']],
    ['F', ['East', 'South']],
    ['.', ['.', '.']]
  ]);

  readonly cardinalMap: Map<string, string[]> = new Map<string, string[]>([
    ['North', ['|', '7', 'F']],
    ['East', ['-', 'J', '7']],
    ['South', ['|', 'L', 'J']],
    ['West', ['-', 'L', 'F']]
  ]);

  solve(data: string): number {
    const map: string[][] = data.split('\n').map(line => [...line]);
    const startPipe: IPipe = this.getStartPipe(map, { y: map.length, x: map[0].length });
    const loopLength: number = this.getLoopLength(map, startPipe);
    return Math.ceil(loopLength / 2);
  }

  private getStartPipe(map: string[][], dimensions: IPos): IPipe {
    for (let y = 0; y < dimensions.y; ++y) {
      for (let x = 0; x < dimensions.x; ++x) {
        const pos: IPos = { y, x };
        if (this.at(map, pos) === 'S') return { pos: pos };
      }
    }
    throw new Error('No loop start found..?');
  }

  private getLoopLength(map: string[][], startPos: IPipe): number {
    let count: number = 0;
    let currentPipe: IPipe = this.getFirstPipe(map, startPos);
    while (this.at(map, currentPipe.pos) !== 'S') {
      currentPipe = this.getNextPipe(map, currentPipe);
      ++count;
    }
    return count;
  }

  private getFirstPipe(map: string[][], startPipe: IPipe): IPipe {
    const cardinals: string[] = Object.keys(Cardinal).filter(key => isNaN(parseInt(key)));
    for (let cardinal of cardinals) {
      const cardPos: IPos = this.getCardPos(startPipe.pos, cardinal);
      if (this.pipeFits(cardinal, this.at(map, cardPos))) {
        return {
          pos: cardPos,
          prev: startPipe
        };
      }
    }
    throw new Error('getFirstPipe: No cardinal fits... wtf?');
  }

  private pipeFits(cardinal: string, pipe: string): boolean {
    return (pipe === 'S') || this.cardinalMap.get(cardinal)!.includes(pipe);
  }

  private getNextPipe(map: string[][], currentPipe: IPipe): IPipe {
    const pos: IPos = this.pipesMap.get(this.at(map, currentPipe.pos))!
      .map(cardinal => this.getCardPos(currentPipe.pos, cardinal))
      .find(cardPos => !this.isEqual(cardPos, currentPipe.prev!.pos))!;
    const nextPipe: IPipe = {
      pos: pos,
      prev: currentPipe
    };
    currentPipe.next = nextPipe;
    return nextPipe;
  }

  private getCardPos(pos: IPos, cardinal: string): IPos {
    switch (cardinal) {
      case 'North':
        return { y: pos.y - 1, x: pos.x };
      case 'East':
        return { y: pos.y, x: pos.x + 1 };
      case 'South':
        return { y: pos.y + 1, x: pos.x };
      case 'West':
        return { y: pos.y, x: pos.x - 1 };
    }
    throw Error('No cardinal... wtf?');
  }

  private at(map: string[][], pos: IPos): string {
    return map.at(pos.y)?.at(pos.x) ?? '.';
  }

  private isEqual(first: IPos, second: IPos): boolean {
    return (first.y === second.y) && (first.x === second.x);
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const pipe: Pipe = new Pipe();
  console.log(pipe.solve(data));
});
