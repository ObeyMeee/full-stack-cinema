import {Component, OnInit} from '@angular/core';
import {FilmService} from './film.service';
import {Film} from "./models/film.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film$!: Observable<Film>;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ =this.filmService.getFilm(id);
  }
}
