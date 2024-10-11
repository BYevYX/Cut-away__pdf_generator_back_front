import { Card, PaperAndCardsNumber } from "../Types";

// TODO возможно надо добавить isHorizontal
export default class BinPacking {
    private paperWidth: number;
    private paperHeight: number;

    private cardWidth: number;
    private cardHeight: number;
    private cardRightMargin: number;
    private cardBottomMargin: number;

    private cards: Card[] = [];
    private isRotate = false;

    constructor({ 
        paperSize,
        cardWidth,
        cardHeight,
        cardRightMargin,
        cardBottomMargin
    }: PaperAndCardsNumber
    ) {
        [this.paperWidth, this.paperHeight] = paperSize;
        this.cardWidth = Number(cardWidth);
        this.cardHeight = Number(cardHeight);
        this.cardRightMargin = Number(cardRightMargin);
        this.cardBottomMargin = Number(cardBottomMargin);
    }

    public fit() {
        this.calculateMaxCardsPositions(this.cardWidth, this.cardHeight);
        // переворот карточки на 90 градусов
        // this.calculateMaxCardsPositions(this.cardHeight, this.cardWidth, { needRotate: true });

        return { cards: this.cards, isRotate: this.isRotate };
    }

    private calculateMaxCardsPositions(width: number, height: number, options: {
        needRotate: boolean
    } = { needRotate: false }) {
        let count = 0;
        let cards: Card[] = [];

        let x = 0, y = 0;
        while (y < this.paperHeight) {
            if (x + width > this.paperWidth) {
                y += height + this.cardBottomMargin;
                x = 0;
                continue;
            }

            cards.push({ x, y, width, height });
            x += width + this.cardRightMargin;
            ++count;
        }
        
        if (count > this.cards.length) {
            this.cards = cards;
            this.isRotate = options.needRotate;
        }
    }
}
