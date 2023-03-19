export class PosterDto {
  filmId!: string;
  name!: string;
  media!: {id: string, image: string, trailer: string}
  sessions!: {id: string, startAt: Date}
}
