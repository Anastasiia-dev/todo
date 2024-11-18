import { Component, OnInit } from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { QuillModule } from 'ngx-quill';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

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
    QuillModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    dateType: new FormControl<string>('today'),
    scheduledDate: new FormControl(new Date()),
  });
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };
  isScheduledTask = false;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formGroup.get('dateType')?.valueChanges.subscribe((type) => {
      this.isScheduledTask = type === 'scheduled';
      this.cdr.detectChanges();
    });
  }

  get dateType(): string | null {
    return this.formGroup.get('dateType')!.value;
  }

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
      this.dialogRef.close(this.formGroup.value);
    }
  }

  isScheduleTask(dateType: string) {
    return dateType === 'scheduled';
  }
}
