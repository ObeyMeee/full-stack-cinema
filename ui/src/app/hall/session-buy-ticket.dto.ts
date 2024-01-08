import { Hall } from './models/hall.model';
import { Ticket } from './models/ticket.model';

export class SessionBuyTicketDto {
  title!: string;
  startAt!: Date;
  duration!: number;
  poster!: string;
  hall!: Hall;
  goodRowPrice!: number;
  luxRowPrice!: number;
  boughtTickets!: Ticket[];
}
