import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/interfaces';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgFor,
    TodoItemComponent,
    CommonModule,
    MatButtonModule,
    CreateTaskDialogComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  taskList$!: Observable<Task[]>;

  constructor(public dialog: MatDialog, public firebase: FirestoreService) {  }

  ngOnInit(): void {
     this.taskList$ = this.firebase.getTasks();

     this.taskList$.forEach(task => console.log(task))
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '1000px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result) {
        this.addNewTask(result);
      }
    });
  }

  removeTaskFromList(id: string) {
    this.firebase
      .deleteTask(id)
      .then(() => {
        console.log('Task deleted successfully');
      })
      .catch((error: any) => {
        console.error('Error deleting task:', error);
      });
  }

  private addNewTask(result: Task) {
    const newTask: Task = {
      id: '111',
      description: result.description ?? '',
      title: result.title,
      completed: false,
      dateType: result.dateType,
      scheduledDate: result.scheduledDate?.toString() ?? '',
    };

    this.firebase
      .addTask(newTask)
      .then(() => {
        console.log('Task added successfully');
      })
      .catch((error: any) => {
        console.error('Error adding task:', error);
      });
  }
}
