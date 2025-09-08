import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Bug } from '../models/bug.model';

@Injectable({ providedIn: "root" })
export class BugService {
  private apiUrl = "https://localhost:7224/api/Bug";

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.apiUrl}/async`).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        return throwError(() => new Error("Failed to fetch bugs"));
      })
    );
  }

  createBug(bug: Omit<Bug, 'id'>): Observable<any> {
    const requestData = {
      Title: bug.title,
      Description: bug.description,
      Status: bug.status,
      Priority: bug.priority,
      ProjectId: bug.projectId || 1,
      AssignedTo: bug.assignedTo || null
    };
    return this.http.post(`${this.apiUrl}/async`, requestData).pipe(
      map(() => 'success'),
      catchError(() => of('error'))
    );
  }

  updateBug(id: number, bug: Partial<Bug>): Observable<any> {
    const requestData = {
      Title: bug.title,
      Description: bug.description,
      Status: bug.status,
      Priority: bug.priority,
      ProjectId: bug.projectId || 1,
      AssignedTo: bug.assignedTo || null
    };
    return this.http.put(`${this.apiUrl}/async/${id}`, requestData).pipe(
      map(() => 'success'),
      catchError(() => of('error'))
    );
  }

  updateBugStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/async/${id}/status`, { Status: status }).pipe(
      map(() => 'success'),
      catchError(() => of('error'))
    );
  }

  deleteBug(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/async/${id}`).pipe(
      map(() => 'success'),
      catchError(() => of('error'))
    );
  }
}
