import {Ticket} from "../../hall/models/ticket.model";

export class ProfileDto {
  ticket!: Ticket
  sessionId!: string;
  sessionStartAt!: Date;
  boughtAt!: Date;
  filmTitle!: string;
}
