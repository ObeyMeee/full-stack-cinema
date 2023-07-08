import { Hall } from './models/hall.model';
import { Ticket } from './models/ticket.model';

export class SessionBuyTicketDto {
  title!: string;
  startAt!: Date;
  image!: string;
  hall!: Hall;
  boughtTickets!: Ticket[];
}
