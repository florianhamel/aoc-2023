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

abstract class AbstractCamel {
  readonly lines: string[];

  abstract cardsValue: Map<string, number>;

  protected constructor(data: string) {
    this.lines = data.split('\n');
  }

  solve(): number {
    const hands: IHand[] = this.getHands();
    return this.getSortedHands(hands).reduce((sum, hand, rank) =>
      sum + (hand.bid * (rank + 1)), 0);
  }
  
  protected getHands(): IHand[] {
    const hands: IHand[] = [];
    this.lines.forEach(line => {
      hands.push(this.getHand(line));
    });
    return hands;
  }

  protected getHand(line: string): IHand {
    const splitLine: string[] = line.split(' ');
    return {
      cards: splitLine.at(0)!,
      bid: parseInt(splitLine.at(1)!)
    };
  }

  protected getSortedHands(hands: IHand[]): IHand[] {
    return hands.sort((first, second) =>
      this.compareHands(first.cards, second.cards));
  }

  protected abstract compareHands(first: string, second: string): number;

  protected getHandType(cards: string): HandType {
    const cardsMap: Map<string, number> = this.getCardsMap(cards);
    const values: number[] = [...cardsMap.values()];
    switch (values.length) {
      case 1:
        return HandType.FIVE_KIND;
      case 2:
        return values.includes(4) ? HandType.FOUR_KIND : HandType.FULL_HOUSE;
      case 3:
        return values.includes(3) ? HandType.THREE_KIND : HandType.TWO_PAIR;
      default:
        return values.includes(2) ? HandType.ONE_PAIR : HandType.HIGH_CARD;
    }
  }

  protected getCardsMap(cards: string): Map<string, number> {
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

  protected compareCards(first: string, second: string): number {
    for (let i = 0; i < 5; ++i) {
      const cardFirst: string = first.at(i)!;
      const cardSecond: string = second.at(i)!;
      if (cardFirst !== cardSecond) {
        return this.cardsValue.get(cardFirst)! - this.cardsValue.get(cardSecond)!;
      }
    }
    return 0;
  }
}

export class Camel extends AbstractCamel {
  readonly cardsValue: Map<string, number> = new Map([
    ['A', 14], ['K', 13], ['Q', 12], ['J', 11], ['T', 10],
    ['9', 9], ['8', 8], ['7', 7], ['6', 6], ['5', 5], ['4', 4], ['3', 3], ['2', 2]
  ]);

  constructor(data: string) {
    super(data);
  }

  compareHands(first: string, second: string): number {
    const typeFirst: HandType = this.getHandType(first);
    const typeSecond: HandType = this.getHandType(second);
    return (typeFirst === typeSecond) ? this.compareCards(first, second) : typeFirst - typeSecond;
  }
}

export class CamelJoker extends AbstractCamel {
  readonly cardsValue: Map<string, number> = new Map([
    ['A', 14], ['K', 13], ['Q', 12], ['T', 10],
    ['9', 9], ['8', 8], ['7', 7], ['6', 6], ['5', 5], ['4', 4], ['3', 3], ['2', 2], ['J', 1]
  ]);

  constructor(data: string) {
    super(data);
  }

  protected compareHands(first: string, second: string): number {
    const typeFirst: HandType = this.getHandTypeWithJoker(first);
    const typeSecond: HandType = this.getHandTypeWithJoker(second);
    return (typeFirst === typeSecond) ? this.compareCards(first, second) : typeFirst - typeSecond;
  }

  private getHandTypeWithJoker(cards: string): HandType {
    const cardsMap: Map<string, number> = this.getCardsMap(cards);
    if (!cards.includes('J')) {
      return this.getHandType(cards);
    }
    let best: HandType = HandType.HIGH_CARD;
    [...cardsMap.keys()].forEach(card => {
      best = Math.max(best, this.getHandType(cards.replace(/J/g, card)));
    });
    return best;
  }
}

PuzzleInputReader.getPuzzleInput(PUZZLE_INPUT).then(data => {
  const camel: Camel = new Camel(data);
  const camelJoker: CamelJoker = new CamelJoker(data);
  console.log(camel.solve());
  console.log(camelJoker.solve());
});
