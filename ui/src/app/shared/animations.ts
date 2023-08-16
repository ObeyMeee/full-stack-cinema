import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const openClosedAnimation = function (
  transformOpen: string,
  transformClosed: string,
  duration: number,
) {
  return trigger('openClosed', [
    state(
      'open',
      style({
        opacity: 1,
        height: '*',
        visibility: 'visible',
        transform: transformOpen,
      }),
    ),
    state(
      'closed',
      style({
        opacity: 0,
        height: 0,
        visibility: 'hidden',
        transform: transformClosed,
      }),
    ),
    transition('closed <=> open', animate(`${duration}s ease-in-out`)),
  ]);
};
