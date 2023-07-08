import { Reaction } from './reaction.model';

export class Comment {
  id!: string;
  mark!: number;
  review!: string;
  username!: string;
  wroteAt!: Date;
  reactions!: Reaction[];
}
