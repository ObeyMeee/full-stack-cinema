import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { isSameDay } from 'date-fns';
import { firstValueFrom, Observable } from 'rxjs';
import { Film } from '../model/film.model';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
import { SessionDto } from '../../poster/dto/session.dto';
import { isSessionWithinPastThirtyMinutes } from '../../shared/session-utils';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.scss'],
})
export class FilmInfoComponent implements OnInit {
  film$!: Observable<Film>;
  sessions!: SessionDto[];
  selectedDate = new Date();
  isDaySelectionHidden = true;

  @ViewChild('daySelect') daySelectElementRef!: ElementRef;
  protected readonly isSameDay = isSameDay;
  protected readonly isSessionWithinPastThirtyMinutes =
    isSessionWithinPastThirtyMinutes;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const id = this.route.parent?.snapshot.params['id'];
    this.film$ = this.filmService.getById(id);
    this.sessions = await firstValueFrom(this.filmService.getSessionsById(id));
  }

  selectDate($event: Date) {
    this.selectedDate = $event;
    this.isDaySelectionHidden = true;
  }
}
