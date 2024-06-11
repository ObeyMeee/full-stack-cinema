import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../shared/pending/status.enum';
import { Pending } from '../../shared/pending/pending.interface';
import { FilmService } from '../../shared/services/film.service';
import { FilmManagingDto } from './film-managing.dto';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../shared/services/toast.service';
import { FirebaseStorageService } from '../../shared/services/firebase-storage.service';

@Component({
  selector: 'app-films-managing',
  templateUrl: './films-managing.component.html',
  styleUrls: ['./films-managing.component.scss'],
  providers: [ConfirmationService, ToastService]
})
export class FilmsManagingComponent implements OnInit {
  filmsCached: FilmManagingDto[] = [];
  filmsPage$!: Pending<FilmManagingDto[]>;
  deleteFilm$!: Pending<void>;
  toggleEnabledFilm$!: Pending<void>;

  @ViewChild('filmsTable') filmsTable!: Table;

  protected readonly Status = Status;

  constructor(
    private filmService: FilmService,
    private firebaseService: FirebaseStorageService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.filmsPage$ = this.filmService.getManagedFilms();
    this.filmsPage$.data.subscribe(data =>
      this.filmsCached = data
    );
  }

  edit(filmId: string) {
    console.log(filmId);
  }

  delete(film: FilmManagingDto) {
    this.confirmationService.close();
    const title = film.title;
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${title}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteFilm$ = this.filmService.deleteById(film.id);
        this.deleteFilm$.data.subscribe(
          {
            next: () => {
              const indexOfDeletedFilm = this.filmsCached.indexOf(film);
              this.firebaseService
                .delete(film.posterUrl)
                .subscribe({
                  error: (error => {
                    console.error(error);
                    this.toastService.showToast(true, 'Error occurred while deleting poster from storage', 'error');
                  })
                });
              this.filmsCached.splice(indexOfDeletedFilm, 1);
              this.toastService.showToast(true, `Film ${title} has been deleted`, 'info');
            },
            error: err => this.toastService.showToast(true, err.message, 'error')
          }
        );
      }
    });
  }

  toggleState(film: FilmManagingDto) {
    const toggledEnabled = !film.enabled;
    this.toggleEnabledFilm$ = this.filmService.updateEnabled(film.id, toggledEnabled);
    this.toggleEnabledFilm$.data.subscribe(
      {
        next: () => {
          const index = this.filmsCached.indexOf(film);
          this.filmsCached[index].enabled = toggledEnabled;
        },
        error: err => this.toastService.showToast(true, err.message, 'error')
      });
  }

  applyFilterGlobal($event: Event, matchMode: string) {
    const globalSearchInput = $event.target as HTMLInputElement;
    this.filmsTable.filterGlobal(globalSearchInput.value, matchMode);
  }
}
