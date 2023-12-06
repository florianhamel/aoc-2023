import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IMapper {
  dst: number;
  src: number;
  range: number;
}

interface IInterval {
  start: number;
  end: number;
}

export class Seed {
  readonly blocks: string[];

  constructor(data: string) {
    this.blocks = data.split('\n\n');
  }

  partOne(): number {
    const maps: Map<string, IMapper[]> = this.getMaps();
    const seeds: number[] = this.getSeedLineNumbers();
    const locations: number[] = this.getLocations(seeds, maps);
    return Math.min(...locations);
  }

  partTwo(): number {
    const maps: Map<string, IMapper[]> = this.getMaps();
    const intervals: IInterval[] = this.getIntervals();
    return this.getFirstMatchingLocation(intervals, maps);
  }

  private getSeedLineNumbers(): number[] {
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

  private getIntervals(): IInterval[] {
    const seeds: number[] = this.getSeedLineNumbers();
    const intervals: IInterval[] = [];
    for (let i = 0; i < seeds.length; i += 2) {
      intervals.push({
        start: seeds.at(i)!,
        end: seeds.at(i)! + seeds.at(i + 1)!
      });
    }
    return intervals;
  }

  private getFirstMatchingLocation(intervals: IInterval[], maps: Map<string, IMapper[]>): number {
    for (let location = 0; true; ++location) {
      const seed: number = this.getSeed(location, maps);
      if (this.isActualSeed(seed, intervals)) {
        return location;
      }
    }
  }

  private getSeed(location: number, maps: Map<string, IMapper[]>): number {
    return [...maps.values()].reduceRight((input, mappers) => this.reverseMap(input, mappers), location);
  }

  private reverseMap(input: number, mappers: IMapper[]): number {
    for (let mapper of mappers) {
      if ((mapper.dst <= input) && (input < mapper.dst + mapper.range)) {
        return mapper.src + (input - mapper.dst);
      }
    }
    return input;
  }

  private isActualSeed(seed: number, intervals: IInterval[]): boolean {
    return intervals.some(interval => (interval.start <= seed && seed < interval.end));
  }

  // Part 1
  private getLocations(seeds: number[], maps: Map<string, IMapper[]>): number[] {
    return seeds.map(seed => this.getLocation(seed, maps));
  }

  private getLocation(seed: number, maps: Map<string, IMapper[]>): number {
    return [...maps.values()].reduce((input, mappers) => this.map(input, mappers), seed);
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
  console.log(seed.partTwo());
});