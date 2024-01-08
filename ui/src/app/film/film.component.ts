import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/services/film.service';
import { Film } from './model/film.model';
import { ActivatedRoute } from '@angular/router';
import { DateDropdownService } from '../shared/date-dropdown/date-dropdown.service';
import { Pending } from '../shared/pending/pending.interface';
import { Status } from '../shared/pending/status.enum';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  film$!: Pending<Film>;
  isTrailerShown = false;
  protected readonly Status = Status;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private dateDropdownService: DateDropdownService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ = this.filmService.getById(id);
  }

  toggleTrailer() {
    this.isTrailerShown = !this.isTrailerShown;
  }

  hideDateDropdown($event: MouseEvent) {
    this.dateDropdownService.hideOnClick($event);
  }
}
