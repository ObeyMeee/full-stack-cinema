import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  images!: any;
  responsiveOptions;

  constructor() {
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

  ngOnInit(): void {
    this.images = [
      {random: 'Random', picture: 'https://picsum.photos/id/123/900/500'},
      {random: 'Samoa', picture: 'https://picsum.photos/id/222/900/500'},
      {random: 'Tonga', picture: 'https://picsum.photos/id/432/900/500'},
      {random: 'Cook Island', picture: 'https://picsum.photos/id/431/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/101/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/141/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/151/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/161/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/171/900/500'},
      {random: 'Niue', picture: 'https://picsum.photos/id/181/900/500'},
      {random: 'American Samoa', picture: 'https://picsum.photos/id/2/900/500'}
    ];
  }

}
