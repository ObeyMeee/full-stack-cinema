import { Ticket } from '../../hall/models/ticket.model';

export class TicketDto {
  ticket!: Ticket;
  sessionId!: string;
  sessionStartAt!: Date;
  boughtAt!: Date;
  filmTitle!: string;
}
