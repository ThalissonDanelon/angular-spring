import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(): void {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(() => {
          this.onError('Erro ao carregar os cursos.');
          return of([])
        })
      );
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onRemove(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir o curso ' + course.name + '?',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.coursesService.remove(course._id).subscribe(
        () => {
          this.refresh();
          this.snackBar.open(
            'Curso removido com sucesso!',
            'X',
            {
              duration: 3000,
              verticalPosition: 'top'
            })
        });
    });
  }

}
