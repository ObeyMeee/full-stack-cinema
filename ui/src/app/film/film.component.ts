import {Component, OnInit} from '@angular/core';
import {FilmService} from './film.service';
import {Film} from "./models/film.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {SessionDto} from "../poster/dto/session.dto";


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film$!: Observable<Film>;
  sessions$!: Observable<SessionDto[]>;


  constructor(private filmService: FilmService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ = this.filmService.getFilm(id);
    this.sessions$ = this.filmService.getSessionsId(id);
  }
}
