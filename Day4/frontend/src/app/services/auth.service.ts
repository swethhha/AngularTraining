import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "https://localhost:7224/api/Auth";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem("jwt_token", res.token);
      }),
      catchError((err) => {
        console.error("Error during login", err);
        return throwError(() => new Error("Invalid credentials"));
      })
    );
  }
  //Logout 
  logout() {
    localStorage.removeItem("jwt_token");
  }

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  }

  storeToken(token: string): void {
    localStorage.setItem("jwt_token", token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
