import { NonNullableFormBuilder } from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { Component } from '@angular/core';

import { CoursesService } from "../../services/courses.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location) {
  }

  onSubmit(): void {
    this.coursesService.save(this.form.value)
      .subscribe(() => this.onSuccess(), () => this.onError());
  }

  onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this.location.back();
    this.snackBar.open(
      'Curso salvo com sucesso.',
      'Show!',
      this.configSnackBar()
    );
  }

  private onError(): void {
    this.snackBar.open(
      'Erro ao salvar o curso.',
      'Entendi',
      this.configSnackBar()
    );
  }

  configSnackBar(): MatSnackBarConfig {
    return {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    }
  }

}