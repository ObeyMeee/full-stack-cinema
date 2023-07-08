export class Ticket {
  id?: string;
  row!: number;
  seat!: number;
  type?: string;
  price?: number;

  constructor(
    row: number,
    seat: number,
    type?: string,
    price?: number,
    id?: string,
  ) {
    this.id = id;
    this.row = row;
    this.seat = seat;
    this.type = type;
    this.price = price;
  }
}
