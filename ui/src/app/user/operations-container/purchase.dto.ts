import { Ticket } from '../../hall/models/ticket.model';

export class PurchaseDto {
  id!: number;
  dealtAt!: Date;
  filmTitle!: string;
  sessionStartAt!: Date;
  tickets!: Ticket[];

  get quantity() {
    return this.tickets.length;
  }

  get totalPrice() {
    return this.tickets
      .map((t) => t.price!)
      .reduce((acc, next) => acc + next, 0);
  }
}
