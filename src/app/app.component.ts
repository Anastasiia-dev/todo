import { QuillModule } from 'ngx-quill';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalanderWidgetComponent} from './components/calander-widget/calander-widget.component'
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodoListComponent,
    TodoItemComponent,
    CommonModule,
    QuillModule,
    CalanderWidgetComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-list';
}
