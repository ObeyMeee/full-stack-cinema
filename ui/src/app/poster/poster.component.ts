import {Component, OnInit} from '@angular/core';
import {PosterService} from "./poster.service";
import {Observable} from "rxjs";
import {PosterDto} from "./poster.dto";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  posters$!: Observable<PosterDto[]>;
  responsiveOptions;

  constructor(private posterService: PosterService) {
    this.responsiveOptions = [
      {
        breakpoint: '1920px',
        numVisible: 5,
        numScroll: 3
      },
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 2
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 2,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.posters$ = this.posterService.getPoster()
  }

}
