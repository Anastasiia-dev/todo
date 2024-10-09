import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss',
})
export class CreateTaskDialogComponent {
  formGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
  });

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {}

  isRequired(controlName: string): boolean {
    if (!this.formGroup.get(controlName) && !this.formGroup) {
      return false;
    }

    return this.formGroup.get(controlName)!.hasError('required');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createTask() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value)
    }
  }
}
