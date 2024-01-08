import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  tmdbApiKey = environment.tmdb.apiKey;
  baseUrl = environment.tmdb.apiUrl;

  constructor(private http: HttpClient) {
  }

  async filterCrewMembers(query: string) {
    const crewMembersIds = await firstValueFrom(this.findCrewMembersIds(query));
    const crewMembers$ = crewMembersIds.map(
      this.findCrewMemberDetailsById.bind(this)
    );
    return forkJoin(crewMembers$);
  }

  private findCrewMembersIds(query: string): Observable<number[]> {
    const url = `${this.baseUrl}search/person`;
    const options = {
      params: {
        api_key: this.tmdbApiKey,
        query: query
      }
    };
    return this.http.get<any>(url, options)
      .pipe(map(response =>
          response.results.map((person: { id: number }) => person.id)
        )
      );
  }

  private findCrewMemberDetailsById(id: number):Observable<CrewMember> {
    const url = `${this.baseUrl}person/${id}`;
    const options = {
      params: {
        api_key: this.tmdbApiKey
      }
    }
    return this.http.get<any>(url, options).pipe(
      map(person => ({
          id,
          name: person.name,
          imgUrl: `https://image.tmdb.org/t/p/w300${person.profile_path}`
        })
      )
    );
  }
}

export type CrewMember = {
  id: number,
  name: string,
  imgUrl: string
}
