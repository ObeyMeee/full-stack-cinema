import { Seat } from './seat.model';

export class Row {
  id!: string;
  number!: number;
  type!: string;
  seats!: Seat[];
}
