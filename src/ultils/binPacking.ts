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
        const cutMargin = 3;
        let horizontalCenter: number = 0, verticalCenter: number = 0;

        while (y + width < this.paperHeight + 30) {
            if (x + width > this.paperWidth) {
                y += height + this.cardBottomMargin + cutMargin * 2;
                horizontalCenter = (this.paperWidth - x) / 2 + cutMargin;
                x = 0;
                continue;
            }

            cards.push({ x, y, width, height });
            x += width + this.cardRightMargin + cutMargin * 2;
            ++count;
        }

        verticalCenter = (this.paperHeight - y) > 0 ? (this.paperHeight - y) / 2 : 0;
        cards = cards.map(card => ({ ...card, y: card.y + verticalCenter, x: card.x + horizontalCenter }));

        if (count > this.cards.length) {
            this.cards = cards;
            this.isRotate = options.needRotate;
        }
    }
}
