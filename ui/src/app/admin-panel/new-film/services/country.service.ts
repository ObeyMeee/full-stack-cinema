import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CountryResponse[]> {
        const url = `${environment.countryApiUrl}all`;
        return this.http.get<any>(url)
            .pipe(map((data: any[]) => data.map<CountryResponse>(
                country => ({
                    name: country.name.common,
                    flag: {
                        png: country.flags.png,
                        alt: country.flags.alt
                    }
                })
            ).sort((a, b) => a.name.localeCompare(b.name))));
    }
}

export type CountryResponse = {
    name: string,
    flag: {
        png: string,
        alt: string,
    }
}
