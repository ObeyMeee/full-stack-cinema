import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DropdownItem } from '../../../shared/dropdown-item.type';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<DropdownItem[]> {
        const url = `${environment.tmdb.apiUrl}genre/movie/list`;
        const options = {
            params: {
                api_key: environment.tmdb.apiKey
            }
        };
        return this.http.get<GenreResponse>(url, options)
            .pipe(map(response =>
                    response.genres.map(
                        genre => ({
                            label: genre.name,
                            value: genre.name
                        })
                    )
                )
            );
    }
}

interface GenreResponse {
    genres: {
        id: number,
        name: string
    }[];
}
