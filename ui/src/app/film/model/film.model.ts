import { Country } from './country.model';
import { Actor } from './actor.model';
import { Media } from './media.model';
import { Genre } from './genre.model';

export class Film {
  enabled!: boolean;
  title!: string;
  description!: string;
  director!: string;
  duration!: number;
  productionYear!: number;
  countries!: Country[];
  media!: Media;
  actors!: Actor[];
  genres!: Genre[];
}
