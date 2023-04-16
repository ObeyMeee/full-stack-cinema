export class Ticket {
  row!: number;
  seat!: number;
  type?: string;
  price?: number

  constructor(row: number, seat: number, type: string, price: number) {
    this.row = row;
    this.seat = seat;
    this.type = type;
    this.price = price;
  }
}
