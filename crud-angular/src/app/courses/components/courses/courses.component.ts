import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  readonly displayedColumns = ['name', 'category'];

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(() => {
          this.onError('Erro ao carregar os cursos.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
