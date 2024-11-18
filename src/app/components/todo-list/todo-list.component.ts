import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/interfaces';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { startWith, tap, delay, shareReplay } from 'rxjs';

import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgFor,
    TodoItemComponent,
    CommonModule,
    MatButtonModule,
    CreateTaskDialogComponent,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  taskList$!: Observable<Task[]>;
  isLoading = false;
  isAdded = false;

  constructor(public dialog: MatDialog, public firebase: FirestoreService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.taskList$ = this.firebase.getTasks().pipe(
      delay(500),
      tap((tasks) => {
        this.isLoading = false;
      }),
      shareReplay()
    );
    this.taskList$.forEach((task) => console.log(task));
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '1000px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
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
    this.isAdded = true;
    const newTask: Task = {
      id: '111',
      description: result.description ?? '',
      title: result.title,
      completed: false,
      dateType:
        result.scheduledDate === new Date() || !result.scheduledDate
          ? 'today'
          : 'scheduled',
      scheduledDate:
        result.scheduledDate?.toString() ?? new Date().toISOString(),
    };

    this.firebase
      .addTask(newTask)
      .then(() => {
        console.log('Task added successfully');
      })
      .catch((error: any) => {
        console.error('Error adding task:', error);
      })
      .finally(() => {
        setTimeout(() => {
          this.isAdded = false; // Add a 500ms delay before resetting
        }, 500);
      });
  }
}
