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
  ageRestriction!: number;
  productionYear!: number;
  startReleaseAt!: Date;
  endReleaseAt!: Date;
  countries!: Country[];
  media!: Media;
  actors!: Actor[];
  genres!: Genre[];
}
