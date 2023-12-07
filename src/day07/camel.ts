import { PUZZLE_INPUT, PuzzleInputReader } from '../utils/puzzle-input-reader';

interface IHand {
  cards: string;
  bid: number;
}

enum HandType {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_KIND,
  FULL_HOUSE,
  FOUR_KIND,
  FIVE_KIND
}

export class Camel {
  readonly lines: string[];

  readonly cardsValue: Map<string, number> = new Map([
    ['A', 14], ['K', 13], ['Q', 12], ['J', 11], ['T', 10],
    ['9', 9], ['8', 8], ['7', 7], ['6', 6], ['5', 5], ['4', 4], ['3', 3], ['2', 2]
  ]);

  constructor(data: string) {
    this.lines = data.split('\n');
  }

  partOne(): number {
    const hands: IHand[] = this.getHands();
    return this.getSortedHands(hands).reduce((sum, hand, rank) =>
      sum + (hand.bid * (rank + 1)), 0);
  }

  private getHands(): IHand[] {
    const hands: IHand[] = [];
    this.lines.forEach(line => {
      hands.push(this.getHand(line));
    });
    return hands;
  }

  private getHand(line: string): IHand {
    const splitLine: string[] = line.split(' ');
    return {
      cards: splitLine.at(0)!,
      bid: parseInt(splitLine.at(1)!)
    };
  }

  private getSortedHands(hands: IHand[]): IHand[] {
    return hands.sort((first, second) => this.compareHands(first, second));
  }

  private compareHands(first: IHand, second: IHand): number {
    const typeFirst: HandType = this.getHandType(first);
    const typeSecond: HandType = this.getHandType(second);
    return (typeFirst === typeSecond) ? this.compareCards(first.cards, second.cards) : typeFirst - typeSecond;
  }

  private compareCards(first: string, second: string): number {
    for (let i = 0; i < 5; ++i) {
      const cardFirst: string = first.at(i)!;
      const cardSecond: string = second.at(i)!;
      if (cardFirst !== cardSecond) {
        return this.cardsValue.get(cardFirst)! - this.cardsValue.get(cardSecond)!;
      }
    }
    return 0;
  }

  private getHandType(hand: IHand): HandType {
    const cardsMap: Map<string, number> = this.getCardsMap(hand.cards);
    const values: number[] = [...cardsMap.values()];
    if (values.length === 1) {
      return HandType.FIVE_KIND;
    } else if (values.length === 2) {
      return values.includes(4) ? HandType.FOUR_KIND : HandType.FULL_HOUSE;
    } else if (values.length === 3) {
      return values.includes(3) ? HandType.THREE_KIND : HandType.TWO_PAIR;
    } else if (values.length === 4) {
      return HandType.ONE_PAIR;
    }
    return HandType.HIGH_CARD;
  }

  private getCardsMap(cards: string): Map<string, number> {
    const cardsMap: Map<string, number> = new Map<string, number>();
    for (let char of cards) {
      if (cardsMap.has(char)) {
        cardsMap.set(char, cardsMap.get(char)! + 1);
      } else {
        cardsMap.set(char, 1);
      }
    }
    return cardsMap;
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const camel: Camel = new Camel(data);
  console.log(camel.partOne());
});
