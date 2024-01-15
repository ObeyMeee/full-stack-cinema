import { Country } from './country.model';
import { Media } from './media.model';
import { Genre } from './genre.model';
import { CrewMemberDto } from './crew-member.dto';

export class Film {
  enabled!: boolean;
  title!: string;
  description!: string;
  duration!: number;
  ageRestriction!: number;
  productionYear!: number;
  startReleaseAt!: Date;
  endReleaseAt!: Date;
  countries!: Country[];
  crew!: CrewMemberDto[]
  media!: Media;
  genres!: Genre[];
}
