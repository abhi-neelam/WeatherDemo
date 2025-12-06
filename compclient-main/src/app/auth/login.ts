import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth-service';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';

@Component({
        selector: 'app-login',
        imports: [ReactiveFormsModule],
        templateUrl: './login.html',
        styleUrl: './login.scss'
})
export class Login implements OnInit {
        form!: UntypedFormGroup;

        constructor(private authService: AuthService) {

        }
        ngOnInit(): void {
                this.form = new UntypedFormGroup({
                        username: new FormControl('', Validators.required),
                        password: new FormControl('', Validators.required),
                });

        }

        onSubmit() {
                let loginrequest: LoginRequest = {
                        username: this.form.controls['username'].value,
                        password: this.form.controls['password'].value
                };
                let response = this.authService.login(loginrequest).subscribe({
                        next: (data: LoginResponse) => {
                                console.log(data);
                        },
                        error: (error) => {
                                console.error(error);
                        }
                });
        }
}
