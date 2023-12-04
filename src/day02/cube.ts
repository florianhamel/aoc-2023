import { PuzzleInputReader } from '../utils/puzzle-input-reader';

interface ICube {
  quantity: number;
  color: TColor;
}

type TColor = 'red' | 'green' | 'blue';

export class Cube {
  partOne(data: string): number {
    let sum: number = 0;
    const cubeLimits: Map<TColor, number> = new Map<TColor, number>([
      ['red', 12],
      ['green', 13],
      ['blue', 14]
    ]);
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      const id: number = this.getId(line);
      const cubes: ICube[] = this.getCubes(line);
      const invalidCubes: ICube[] = this.getInvalidCubes(cubes, cubeLimits);
      sum += (invalidCubes.length === 0) ? id : 0;
    });
    return sum;
  }

  partTwo(data: string): number {
    let sum: number = 0;
    const lines: string[] = data.split('\n');
    lines.forEach(line => {
      const cubes: ICube[] = this.getCubes(line);
      const fewestCubes: Map<string, number> = this.getFewestCubes(cubes);
      sum += this.getPower(fewestCubes);
    });
    return sum;
  }

  private getFewestCubes(cubes: ICube[]): Map<TColor, number> {
    const fewestCubes: Map<TColor, number> = new Map<TColor, number>();
    fewestCubes.set('red', this.getMaxByColor(cubes, 'red'));
    fewestCubes.set('green', this.getMaxByColor(cubes, 'green'));
    fewestCubes.set('blue', this.getMaxByColor(cubes, 'blue'));
    return fewestCubes;
  }

  private getMaxByColor(cubes: ICube[], color: TColor): number {
    return cubes.reduce((prevMax, cube) =>
      ((cube.color === color) && cube.quantity > prevMax) ? cube.quantity : prevMax, 1);
  }

  private getPower(fewestCubes: Map<string, number>): number {
    return [...fewestCubes.values()].reduce((prevMax, max) => prevMax * max, 1);
  }

  private getId(line: string): number {
    return parseInt(line.split(':').at(0)!.split(' ').at(1)!);
  }

  private getCubes(line: string): ICube[] {
    const rawCubeDraws: string[] = this.getRawCubeDraws(line);
    const rawCubes: string[] = this.getRawCubes(rawCubeDraws);
    return rawCubes.map(rawCube => this.getCube(rawCube));
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
      color: (quantityColor.at(1) ?? '') as TColor
    };
  }

  private getInvalidCubes(cubes: ICube[], cubeLimits: Map<string, number>): ICube[] {
    return cubes.filter(cube => cubeLimits.has(cube.color) && (cube.quantity > cubeLimits.get(cube.color)!));
  }

  solve(): void {
    PuzzleInputReader.getPuzzleInput('./puzzle-input.txt.txt').then(data => {
      console.log(this.partOne(data));
      console.log(this.partTwo(data));
    });
  }
}

new Cube().solve();