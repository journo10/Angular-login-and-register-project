import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyjsService } from '../services/alertifyjs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertifyjsService: AlertifyjsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  //form login
  loginSubmit() {
    this.http.get<any>(' http://localhost:3000/signUpUsers').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.alertifyjsService.success(
            'Giriş başarılı bir şekilde gerçekleşti.'
          );
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          this.alertifyjsService.error('Giriş yapılamadı.');
        }
      },
      (error) => {
        this.alertifyjsService.error('Kullanıcı bulunamadı.');
      }
    );
  }
}
