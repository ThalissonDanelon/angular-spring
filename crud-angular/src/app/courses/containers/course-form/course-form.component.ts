import { ActivatedRoute } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';

import { CoursesService } from "../../services/courses.service";
import { Course } from "../../model/course";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200)
    ]],
    category: ['', Validators.required]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.onError();
      return;
    }
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      return `O nome deve conter no mínimo ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength') && fieldName === 'name') {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `O nome deve conter no máximo ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength') && fieldName === 'category') {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 30;
      return `O nome deve conter no máximo ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.';
  }

}
