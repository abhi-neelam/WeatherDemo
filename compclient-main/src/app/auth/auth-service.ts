import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
        providedIn: 'root'
})
export class AuthService {
        private token = 'token';
        constructor(private http: HttpClient) {

        }
        login(loginRequest: LoginRequest): Observable<LoginResponse> {
                return this.http.post<LoginResponse>(environment.apiUrl + "api/Admin", loginRequest).pipe(
                        tap(response => {
                                if (response.success) {
                                        localStorage.setItem(this.token, response.token);
                                }
                        })
                );
        }
        logout(): void {
                localStorage.removeItem(this.token);
        }
        isAuthenticated(): boolean {
                return localStorage.getItem(this.token) !== null;
        }
}
