import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from "../../model/course";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  readonly displayedColumns = ['name', 'category', 'actions'];

  @Input() courses: Course[] = [];

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  constructor() {
  }

  onAdd(): void {
    this.add.emit(true)
  }

  onEdit(course: Course): void {
    this.edit.emit(course)
  }

  onDelete(course: Course): void {
    this.remove.emit(course)
  }

}
