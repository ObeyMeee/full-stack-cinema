import { SessionDto } from '../poster/dto/session.dto';
import { differenceInMinutes, isPast } from 'date-fns';

export function isSessionWithinPastThirtyMinutes(session: SessionDto) {
  const now = new Date();
  const SECONDS_PER_MINUTE = 60;
  const minutes = 30;
  const THIRTY_MINUTES = SECONDS_PER_MINUTE * minutes;
  return (
    isPast(session.startAt) &&
    differenceInMinutes(now, session.startAt) < THIRTY_MINUTES
  );
}
