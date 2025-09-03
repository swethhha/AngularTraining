import { Injectable, signal } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = signal<Student[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 22,
      department: 'Computer Science'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      age: 21,
      department: 'Engineering'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      age: 23,
      department: 'Business'
    }
  ]);
  private nextId = 4;

  getStudents() {
    return this.students.asReadonly();
  }

  addStudent(student: Omit<Student, 'id'>) {
    const newStudent = { ...student, id: this.nextId++ };
    this.students.update(students => [...students, newStudent]);
  }

  updateStudent(id: number, student: Omit<Student, 'id'>) {
    this.students.update(students => 
      students.map(s => s.id === id ? { ...student, id } : s)
    );
  }

  getDepartments() {
    return ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'];
  }
}