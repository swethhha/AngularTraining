import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-list',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, Select, CardModule, ToastModule, ReactiveFormsModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
  providers: [MessageService]
})
export class List {
  private studentService = inject(StudentService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  students = this.studentService.getStudents();
  visible = signal(false);
  selectedStudent = signal<Student | null>(null);

  editForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
    department: ['', Validators.required]
  });

  departments = this.studentService.getDepartments().map(dept => ({ label: dept, value: dept }));

  onRowSelect(event: any) {
    const student = event.data as Student;
    this.selectedStudent.set(student);
    this.editForm.patchValue(student);
    this.visible.set(true);
  }

  onSave() {
    if (this.editForm.valid && this.selectedStudent()) {
      const studentData = this.editForm.value;
      this.studentService.updateStudent(this.selectedStudent()!.id, studentData);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Updated!',
        detail: `Student ${studentData.name} has been updated successfully!`,
        life: 3000
      });
      
      this.visible.set(false);
      this.selectedStudent.set(null);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.',
        life: 3000
      });
    }
  }

  onCancel() {
    this.visible.set(false);
    this.selectedStudent.set(null);
  }

  getFieldError(field: string): string {
    const control = this.editForm.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['minlength']) return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['min']) return `Age must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `Age must be at most ${control.errors['max'].max}`;
    }
    return '';
  }

  getDepartmentCount(): number {
    const uniqueDepartments = new Set(this.students().map(s => s.department));
    return uniqueDepartments.size;
  }

  getAverageAge(): string {
    const students = this.students();
    if (students.length === 0) return '0';
    const avgAge = students.reduce((sum, s) => sum + s.age, 0) / students.length;
    return Math.round(avgAge).toString();
  }

  getNewestStudent(): string {
    const students = this.students();
    if (students.length === 0) return 'None';
    return students[students.length - 1]?.name || 'None';
  }
}
