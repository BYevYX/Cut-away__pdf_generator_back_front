interface Cards<T> {
    cardWidth: T,
    cardHeight: T,
    cardRightMargin: T,
    cardBottomMargin: T,
}

export interface PaperAndCards extends Cards<string> {
    paperSize: string,
}

export interface PaperAndCardsNumber extends Cards<number | string> {
    paperSize: [number, number],
}

export interface Card {
    x: number;
    y: number;
    width: number;
    height: number;
}

