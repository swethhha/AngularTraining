import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, InputTextModule, Select, ButtonModule, CardModule, ToastModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
  providers: [MessageService]
})
export class Registration {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
    department: ['', Validators.required]
  });

  departments = this.studentService.getDepartments().map(dept => ({ label: dept, value: dept }));

  onSubmit() {
    if (this.form.valid) {
      const studentData = this.form.value;
      this.studentService.addStudent(studentData);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: `Student ${studentData.name} has been registered successfully!`,
        life: 3000
      });
      
      // Reset form
      this.form.reset();
      
      // Navigate to students page after a short delay
      setTimeout(() => {
        this.router.navigate(['/students']);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.',
        life: 3000
      });
    }
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['minlength']) return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['min']) return `Age must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `Age must be at most ${control.errors['max'].max}`;
    }
    return '';
  }
}
