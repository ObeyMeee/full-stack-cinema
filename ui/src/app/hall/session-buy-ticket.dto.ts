import {Hall} from "./models/hall.model";

export class SessionBuyTicketDto {
   title!: string;
   startAt!: Date;
   image!: string;
   hall!: Hall;
}
