import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId?: number;
  assignedTo?: string;
}

export interface BugStats {
  openvsResolved: { open: number; resolved: number };
  priorityDistribution: { low: number; medium: number; high: number };
  bugsByStatus: { [status: string]: number };
  bugsPerProject: { [projectId: number]: number };
  openCount: number;
  resolvedCount: number;
  inProgressCount: number;
  closedCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  totalCount: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}

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

  getBugStats(): Observable<BugStats> {
    return this.http.get<BugStats>(`${this.apiUrl}/stats`).pipe(
      catchError((err) => {
        console.error("Error fetching bug stats", err);
        return throwError(() => new Error("Failed to fetch bug stats"));
      })
    );
  }

  createBug(bug: Omit<Bug, "id">): Observable<any> {
    const requestData = {
      Title: bug.title,
      Description: bug.description,
      Status: bug.status,
      Priority: bug.priority,
      ProjectId: bug.projectId || 1,
      AssignedTo: bug.assignedTo || null
    };
    return this.http.post(`${this.apiUrl}/async`, requestData).pipe(
      map(() => "success"),
      catchError(() => of("error"))
    );
  }

  updateBug(id: number, bug: Partial<Bug>): Observable<any> {
    const requestData = {
      Title: bug.title,
      Description: bug.description,
      Status: bug.status,
      Priority: bug.priority,
      ProjectId: bug.projectId ,
      AssignedTo: bug.assignedTo || null
    };
    return this.http.put(`${this.apiUrl}/async/${id}`, requestData).pipe(
      map(() => "success"),
      catchError(() => of("error"))
    );
  }

  updateBugStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/async/${id}/status`, { Status: status }).pipe(
      map(() => "success"),
      catchError(() => of("error"))
    );
  }

  deleteBug(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/async/${id}`).pipe(
      map(() => "success"),
      catchError(() => of("error"))
    );
  }

  addComment(bugId: number, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bugId}/comments`, { message: comment }).pipe(
      map(() => "success"),
      catchError(() => of("error"))
    );
  }

  getBugById(id: number): Observable<Bug> {
    return this.http.get<Bug>(`${this.apiUrl}/async/${id}`).pipe(
      catchError((err) => {
        console.error("Error fetching bug", err);
        return throwError(() => new Error("Failed to fetch bug"));
      })
    );
  }
}
