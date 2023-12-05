import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IMapper {
  dst: number;
  src: number;
  range: number;
}

export class Seed {
  readonly blocks: string[];

  constructor(data: string) {
    this.blocks = data.split('\n\n');
  }

  partOne(): number {
    const seeds: number[] = this.getSeeds();
    const maps: Map<string, IMapper[]> = this.getMaps();
    const locations: number[] = this.getLocations(seeds, maps);
    return Math.min(...locations);
  }

  private getSeeds(): number[] {
    return this.blocks.at(0)!.split(':').at(1)!.trim().split(' ')
      .map(seed => parseInt(seed));
  }

  private getMaps(): Map<string, IMapper[]> {
    const maps: Map<string, IMapper[]> = new Map<string, IMapper[]>();
    this.blocks.slice(1, this.blocks.length).forEach(block => {
      const blockLines: string[] = block.split('\n');
      maps.set(this.getName(blockLines), this.getMappers(blockLines));
    });
    return maps;
  }

  private getName(blockLines: string[]): string {
    return blockLines.at(0)!.split(' ').at(0)!;
  }

  private getMappers(blockLines: string[]): IMapper[] {
    return blockLines.slice(1, blockLines.length).map(blockLine => this.getMapper(blockLine));
  }

  private getMapper(blockLine: string): IMapper {
    const values: string[] = blockLine.split(' ');
    return {
      dst: parseInt(values.at(0)!),
      src: parseInt(values.at(1)!),
      range: parseInt(values.at(2)!)
    };
  }

  private getLocations(seeds: number[], maps: Map<string, IMapper[]>): number[] {
    return seeds.map(seed => [...maps.values()]
      .reduce((input, mappers) => this.map(input, mappers), seed));
  }

  private map(input: number, mappers: IMapper[]): number {
    for (let mapper of mappers) {
      if ((mapper.src <= input) && (input < mapper.src + mapper.range)) {
        return mapper.dst + (input - mapper.src);
      }
    }
    return input;
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const seed: Seed = new Seed(data);
  console.log(seed.partOne());
});