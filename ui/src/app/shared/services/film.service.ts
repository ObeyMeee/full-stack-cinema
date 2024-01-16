import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../../film/model/film.model';
import { SessionDto } from '../../poster/dto/session.dto';
import { BaseService } from './base.service';
import { RequestStatusService } from '../pending/request-status.service';
import { Session } from '../../admin-panel/new-film/session.model';
import { CrewMember } from '../../admin-panel/new-film/services/crew.service';
import { NewFilmDto } from '../../admin-panel/new-film/new-film.dto';
import { FilmManagingDto } from '../../admin-panel/films-managing/film-managing.dto';

@Injectable({
  providedIn: 'root',
})
export class FilmService extends BaseService {

  private filmsUrl = `${this.baseUrl}films`;
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getById(id: string) {
    const url = `${this.filmsUrl}/${id}`;
    const request = this.http.get<Film>(url);
    return this.requestStatusService.handleRequestWithStatus<Film>(request);
  }

  getSessionsById(id: string) {
    const url = `${this.filmsUrl}/${id}/sessions`;
    const request = this.http.get<SessionDto[]>(url);
    return this.requestStatusService.handleRequestWithStatus<SessionDto[]>(
      request
    );
  }

  getManagedFilms() {
    const url = `${this.filmsUrl}/manage`;
    const request = this.http.get<FilmManagingDto[]>(url);
    return this.requestStatusService.handleRequestWithStatus<FilmManagingDto[]>(
      request
    );
  }

  save(film: NewFilmDto) {
    const saveFilmBody = this.mapToBody(film);
    const request = this.http.post<void>(this.filmsUrl, saveFilmBody);
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }

  deleteById(filmId: string) {
    const url = `${this.filmsUrl}/${filmId}`;
    const request = this.http.delete<void>(url);
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }

  updateEnabled(filmId: string, enabled: boolean) {
    const url = `${this.filmsUrl}/${filmId}`;
    const request = this.http.patch<void>(url, { enabled });
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }

  private mapToBody(film: any) {
    const newDirectors: CrewMemberRequest[] = this.mapCrewMembers(film, 'directors');
    const newScreenWriters: CrewMemberRequest[] = this.mapCrewMembers(film, 'screenwriters');
    const newActors: CrewMemberRequest[] = this.mapCrewMembers(film, 'actors');
    const saveFilmBody: SaveFilmBody = {
      generalInfo: {
        ...film.generalInfo,
        productionYear: film.generalInfo.productionYear.getFullYear()
      },
      crew: {
        directors: newDirectors,
        screenwriters: newScreenWriters,
        actors: newActors
      },
      additionalInfo: { ...film.additionalInfo },
      sessions: [...film.sessions]
    };
    return saveFilmBody;
  }

  private mapCrewMembers(film: any, crewRole: string): CrewMemberRequest[] {
    return film.crew[crewRole].map((crewMember: CrewMember) => ({
        id: crewMember.id,
        fullName: crewMember.name
      })
    );
  }
}

interface SaveFilmBody {
  generalInfo: {
    title: string,
    description: string,
    genres: string[],
    duration: number,
    productionYear: number,
    countries: string[]
  },
  crew: {
    directors: CrewMemberRequest[],
    screenwriters: CrewMemberRequest[],
    actors: CrewMemberRequest[],
  },
  additionalInfo: {
    language: string,
    age: number,
    startReleaseAt: Date,
    endReleaseAt: Date,
    media: {
      poster: any,
      trailer: string
    }
  },
  sessions: Session[]
}

type CrewMemberRequest = { id: number, fullName: string };
