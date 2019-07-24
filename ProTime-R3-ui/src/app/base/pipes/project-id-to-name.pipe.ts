import { Pipe, PipeTransform } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'projectIdToName'
})
export class ProjectIdToNamePipe implements PipeTransform {
  constructor(public projectService: ProjectService) { }

  transform(value: any, args?: any): any {
    return Observable.create(o => {
      this.projectService.getAll().subscribe(r => {
        const project = r.find(p => p.id == value);
        o.next(project ? project.projectName : value);
      });
    });
  }
}
