import {SafeUrlPipe} from './safe-url.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafeUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
