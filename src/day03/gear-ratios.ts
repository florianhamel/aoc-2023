import { PuzzleInputReader } from '../utils/puzzle-input-reader';
import { isDefined } from '../utils/utils';

interface IPos {
  y: number;
  x: number;
}

export class GearRatios {
  readonly map: string[];

  constructor(data: string) {
    this.map = data.split('\n');
  }

  partOne(): number {
    let sum: number = 0;
    const height: number = this.map.length;
    const width: number = this.map.at(0)!.length;
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        if (this.isNumber(y, x)) {
          const parsedNumber: number = parseInt(this.map.at(y)!.substring(x));
          const length: number = parsedNumber.toString().length;
          sum += this.isPartNumber(y, x, length) ? parsedNumber : 0;
          x += length - 1;
        }
      }
    }
    return sum;
  }

  partTwo(): number {
    let sum: number = 0;
    const height: number = this.map.length;
    const width: number = this.map.at(0)!.length;
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        if (/[*]/.test(this.get(y, x))) {
          sum += this.getGearRatio(y, x);
        }
      }
    }
    return sum;
  }

  private getGearRatio(y: number, x: number): number {
    const gearNumbers: number[] = [];
    for (let _y = y - 1; _y <= y + 1; ++_y) {
      for (let _x = x - 3; _x <= x + 3; ++_x) {
        if (this.isNumber(_y, _x)) {
          const parsedNumber: number = parseInt(this.map.at(_y)!.substring(_x));
          const length: number = parsedNumber.toString().length;
          if (this.isGearNumber(_y, _x, { y, x })) {
            gearNumbers.push(parsedNumber);
          }
          _x += length - 1;
        }
      }
    }
    return (gearNumbers.length === 2) ? gearNumbers.reduce((ratio, gearNumber) => ratio * gearNumber, 1) : 0;
  }

  private isGearNumber(y: number, x: number, target: IPos): boolean {
    let _x: number = x;
    while (this.isNumber(y, _x)) {
      if (this.nextTo({ y, x: _x }, target)) {
        return true;
      }
      ++_x;
    }
    return false;
  }

  private nextTo(pos: IPos, target: IPos): boolean {
    for (let y = pos.y - 1; y <= pos.y + 1; ++y) {
      for (let x = pos.x - 1; x <= pos.x + 1; ++x) {
        if ((y === target.y) && (x === target.x)) {
          return true;
        }
      }
    }
    return false;
  }

  private isNumber(y: number, x: number): boolean {
    return (/[0-9]/.test(this.get(y, x)));
  }

  private isPartNumber(y: number, x: number, length: number): boolean {
    return (
      this.isSymbol(y, x - 1) || this.isSymbol(y, x + length) ||
      this.symbolAbove(y, x, length) || this.symbolBelow(y, x, length)
    );
  }

  private symbolAbove(y: number, x: number, length: number): boolean {
    for (let _x = x - 1; _x <= x + length; ++_x) {
      if (this.isSymbol(y - 1, _x)) {
        return true;
      }
    }
    return false;
  }

  private symbolBelow(y: number, x: number, length: number): boolean {
    for (let _x = x - 1; _x <= x + length; ++_x) {
      if (this.isSymbol(y + 1, _x)) {
        return true;
      }
    }
    return false;
  }

  private isSymbol(y: number, x: number): boolean {
    return /[^0-9.]/.test(this.get(y, x));
  }

  private get(y: number, x: number): string {
    return this.map.at(y)?.at(x) ?? '.';
  }
}

PuzzleInputReader.getPuzzleInput('./puzzle-input.txt.txt').then(data => {
  const gearRatios: GearRatios = new GearRatios(data);
  console.log(gearRatios.partOne());
  console.log(gearRatios.partTwo());
});
