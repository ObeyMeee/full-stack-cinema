import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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

  @Input() isDaySelectionHidden = true;
  @Output() isDaySelectionHiddenChange = new EventEmitter<boolean>();

  protected readonly isSameDay = isSameDay;
  protected readonly isSessionWithinPastThirtyMinutes =
    isSessionWithinPastThirtyMinutes;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    const id = this.route.parent?.snapshot.params['id'];
    this.film$ = this.filmService.getById(id).data;
    this.sessions = await firstValueFrom(
      this.filmService.getSessionsById(id).data,
    );
  }

  selectDate($event: Date) {
    this.selectedDate = $event;
    this.isDaySelectionHidden = true;
  }
}
