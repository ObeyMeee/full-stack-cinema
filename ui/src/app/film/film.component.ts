import {Component, OnInit} from '@angular/core';
import {FilmService} from './film.service';
import {Film} from "./model/film.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film$!: Observable<Film>;
  isTrailerShown = false;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ = this.filmService.getById(id);
  }

  toggleTrailer() {
    this.isTrailerShown = !this.isTrailerShown;
  }
}
