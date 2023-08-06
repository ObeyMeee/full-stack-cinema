import { Component, OnInit } from '@angular/core';
import { FilmService } from './film.service';
import { Film } from './model/film.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DateDropdownService } from '../shared/date-dropdown/date-dropdown.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  film$!: Observable<Film>;
  isTrailerShown = false;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private dateDropdownService: DateDropdownService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ = this.filmService.getById(id).data;
  }

  toggleTrailer() {
    this.isTrailerShown = !this.isTrailerShown;
  }

  hideDateDropdown($event: MouseEvent) {
    this.dateDropdownService.hideOnClick($event);
  }
}
