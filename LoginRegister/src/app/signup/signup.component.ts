import { AlertifyjsService } from './../services/alertifyjs.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AlertifyjsService],
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertifyjsService: AlertifyjsService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['',Validators.required],
      mobile: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  //form signUp
  signUpSubmit() {
    this.http
      .post<any>(' http://localhost:3000/signUpUsers', this.signUpForm.value)
      .subscribe((res) => 
      {
        this.alertifyjsService.success('Kayıt işleminiz başarılı bir şekilde gerçekleşti.');
        this.signUpForm.reset();
        this.router.navigate(['login'])
      },error=>{
        this.alertifyjsService.error('Kayıt işleminiz gerçekleşmedi.');
      }
      );
  }
}
