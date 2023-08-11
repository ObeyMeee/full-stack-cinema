import { Component, OnInit } from '@angular/core';
import { PosterService } from './poster.service';
import { PosterDto } from './dto/poster.dto';
import { Pending } from '../shared/pending/pending.interface';
import { Status } from '../shared/pending/status.enum';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent implements OnInit {
  posters$!: Pending<PosterDto[]>;
  responsiveOptions: any;
  isTrailerShown = false;
  trailerUrl!: string;
  title!: string;
  protected readonly Status = Status;

  constructor(private posterService: PosterService) {
    this.responsiveOptions = [
      {
        breakpoint: '1920px',
        numVisible: 4,
        numScroll: 3,
      },
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 2,
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.posters$ = this.posterService.getPoster();
  }

  toggleTrailer() {
    this.isTrailerShown = !this.isTrailerShown;
  }

  setTrailerData($event: { title: string; url: string }) {
    this.toggleTrailer();
    this.title = $event.title;
    this.trailerUrl = $event.url;
  }
}
