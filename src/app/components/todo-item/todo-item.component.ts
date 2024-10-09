import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../shared/models/interfaces';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    NgClass,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() task: Todo = {
    id: 12345,
    title: '',
    completed: false,
  };
  @Output() deleteTask = new EventEmitter()


  onDelete(taskId: number) {
    this.deleteTask.emit(taskId)
  }
}
