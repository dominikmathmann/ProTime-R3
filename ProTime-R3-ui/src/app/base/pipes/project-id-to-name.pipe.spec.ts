import { ProjectIdToNamePipe } from './project-id-to-name.pipe';
import { ProjectService } from '../services/project.service';
import { HttpClient } from '@angular/common/http';
import { inject, async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DefaultService } from 'src/app/api';

describe('ProjectIdToNamePipe', () => {

  it('create an instance', () => {
    const pipe = new ProjectIdToNamePipe({} as ProjectService);
    expect(pipe).toBeTruthy();
  });

  it('service call', () => {
    const projectService = new ProjectService(null);
    const pipe = new ProjectIdToNamePipe(projectService);
    spyOn(projectService, 'getAll').and.returnValue(of([{ id: 100, projectName: 'xxx' }]));

    // unknown project
    pipe.transform('12', []).subscribe(r => {
      expect(r).toEqual('12');
    });

    // project
    pipe.transform('100', []).subscribe(r => {
      expect(r).toEqual('xxx');
    });
  });
});
