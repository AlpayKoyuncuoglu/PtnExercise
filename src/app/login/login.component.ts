import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var giveAlert: any;
declare function validationEmail(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emaildata: any;
  loggedIn = false;
  rememberMe=false;

  public loginForm!: UntypedFormGroup;
  loginClicked = false;
  isEmailValid = false;
  emailRegex =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([, Validators.required, Validators.minLength(6), Validators.maxLength(20)])),
      rememberMe:new FormControl()
    })
  }

  //get email() { return this.loginForm.get('email'); }

  get x() {
    return this.loginForm.controls;
  }


  login() {
    debugger;
    console.log(this.loginForm);
    console.log(this.loginForm.controls['email'].value);
    var checkMail = this.loginForm.controls['email'].value
    this.loginClicked = true;
    this.loginForm.markAllAsTouched();
    //validationEmail()
    // this.emaildata=validationEmail(checkMail);
    // console.log(this.emaildata)
    debugger;

    let sendData: any;
    sendData = {
      "password": this.loginForm.controls['password'].value,
      "email": this.loginForm.controls['email'].value,
    }
    //  this.isEmailValid = validateEmail(this.email);
    // console.log(this.isEmailValid);

    if (this.loginForm.valid) {
      this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/user/login", sendData).subscribe(
        res => {
          debugger;
            if(res!=null)
          this.loggedIn = true;

         // alert("signup successfull");
          //this.signupForm.reset();
          this.router.navigate(['dashboard']);
          sessionStorage.setItem('tkn', res.token);
          if(this.rememberMe==true)
          {
            localStorage.setItem("tkn",res.token)
          }
          console.log(res);
        },
        err => {
          console.log(err);
          debugger;
          alert("something went wrong");
        }
      )
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logOut() {
    localStorage.removeItem("tkn");
    sessionStorage.removeItem("tkn");
    this.loggedIn = false;
  }
  a(){
    this.rememberMe=!this.rememberMe
    console.log(this.rememberMe);
  }
}

function validateEmail(email: any) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
}