import { ProjectIdToNamePipe } from './project-id-to-name.pipe';
import { ProjectService } from '../services/project.service';

describe('ProjectIdToNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectIdToNamePipe({} as ProjectService);
    expect(pipe).toBeTruthy();
  });
});
