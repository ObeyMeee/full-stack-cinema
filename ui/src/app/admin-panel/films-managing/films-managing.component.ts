import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../shared/pending/status.enum';
import { Pending } from '../../shared/pending/pending.interface';
import { FilmService } from '../../shared/services/film.service';
import { FilmManagingDto } from './film-managing.dto';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-films-managing',
  templateUrl: './films-managing.component.html',
  styleUrls: ['./films-managing.component.scss']
})
export class FilmsManagingComponent implements OnInit {
  filmsPage$!: Pending<FilmManagingDto[]>;
  @ViewChild('filmsTable') filmsTable!: Table;

  protected readonly Status = Status;

  constructor(private filmService: FilmService) {
  }

  ngOnInit() {
    this.filmsPage$ = this.filmService.getManagedFilms();
  }

  edit(filmId: string) {
    console.log(`update film ==> ${filmId}`);
  }

  delete(filmId: string) {
    console.log(`delete film ==> ${filmId}`);
  }

  toggleState(filmId: string) {
    console.log(`toggle state ==> ${filmId}`);
  }

  applyFilterGlobal($event: Event, contains: string) {
    const globalSearchInput = $event.target as HTMLInputElement;
    this.filmsTable.filterGlobal(globalSearchInput.value, 'contains');
  }
}
