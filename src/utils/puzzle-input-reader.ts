import * as fs from 'fs';

export const PUZZLE_INPUT = './puzzle-input.txt';

export class PuzzleInputReader {
  static async getPuzzleInput(filePath: string): Promise<string> {
    try {
      return await fs.promises.readFile(filePath, 'utf8');
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }
}