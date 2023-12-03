import { PuzzleInputReader } from '../utils/PuzzleInputReader';

export interface ICube {
  quantity: number;
  color: string;
}

export class Cube {
  partOne(data: string): number {
    let sum: number = 0;
    const cubeLimits: Map<string, number> = new Map<string, number>([
      ['red', 12],
      ['green', 13],
      ['blue', 14]
    ]);
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      const id: number = this.getId(line);
      const rawCubeDraws: string[] = this.getRawCubeDraws(line);
      const rawCubes: string[] = this.getRawCubes(rawCubeDraws);
      const cubes: ICube[] = rawCubes.map(rawCube => this.getCube(rawCube));
      const invalidCubes: ICube[] = this.getInvalidCubes(cubes, cubeLimits);
      sum += (invalidCubes.length === 0) ? id : 0;
    });
    return sum;
  }

  private getId(line: string): number {
    return parseInt(line.split(':').at(0)!.split(' ').at(1)!);
  }

  private getRawCubeDraws(line: string): string[] {
    return line.split(':').at(1)!.split(';');
  }

  private getRawCubes(rawCubeDraws: string[]): string[] {
    return rawCubeDraws.map(rawCubeDraw => rawCubeDraw.trim().split(', ')).flat();
  }

  private getCube(rawCube: string): ICube {
    const quantityColor: string[] = rawCube.split(' ');
    return {
      quantity: parseInt(quantityColor.at(0) ?? '0'),
      color: quantityColor.at(1) ?? ''
    };
  }

  private getInvalidCubes(cubes: ICube[], cubeLimits: Map<string, number>): ICube[] {
    return cubes.filter(cube => cubeLimits.has(cube.color) && (cube.quantity > cubeLimits.get(cube.color)!));
  }

  solve(): void {
    PuzzleInputReader.getPuzzleInput('./puzzleInput.txt').then(data => {
      console.log(this.partOne(data));
    });
  }
}

new Cube().solve();