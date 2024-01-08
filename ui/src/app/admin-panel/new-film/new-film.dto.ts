import { CrewMember } from './services/crew.service';

export class NewFilmDto {
  generalInfo!: {
    title: string,
    description: string,
    genres: string[],
    duration: number,
    productionYear: number,
    countries: string[]
  };

  crew!: {
    directors: CrewMember[],
    screenwriters: CrewMember[],
    actors: CrewMember[]
  };
  additionalInfo!: {
    language: string,
    ageRestriction: number,
    startReleaseAt: Date,
    endReleaseAt: Date,
    media: {
      poster: File | string,
      trailer: string
    }
  };
}
