import { TimeToHourPipe } from './time-to-hour.pipe';

describe('TimeToHourPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeToHourPipe();
    expect(pipe).toBeTruthy();
  });
});
