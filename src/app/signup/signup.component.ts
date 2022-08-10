import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  registerClicked = false;
  validPattern = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/";
  //'^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
  //[a-zA-Z ]*
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      //password: new UntypedFormControl('', Validators.compose([Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'), Validators.required, Validators.minLength(6), Validators.maxLength(20)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])),
      conpassword: new FormControl('', Validators.required),
      // phone:
    }, {
      validators: this.Mustmatch('password', 'conpassword')
    })
  }

  get x() {
    return this.signupForm.controls;
  }

  Mustmatch(password: any, conpassword: any) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const conpasswordcontrol = formGroup.controls[conpassword];

      if (conpasswordcontrol.errors && !conpasswordcontrol.errors['Mustmatch']) {
        return;
      }

      if (passwordcontrol.value !== conpasswordcontrol.value) {
        conpasswordcontrol.setErrors({ Mustmatch: true });
      }
      else {
        conpasswordcontrol.setErrors(null);
      }

    }
  }

  signUp() {
    debugger;
    console.log(this.signupForm);
    // this.signupForm.['conpassword'].
    this.registerClicked = true;
    // if (this.signupForm.valid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    debugger;
    console.log(this.signupForm.value)
    //var x=JSON.parse(this.signupForm.value)
    var y = JSON.stringify(this.signupForm.value)
    // console.log(x)
    console.log(y)

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      responseType: 'text' as 'json',
      body: (this.signupForm.value)

    };

    //this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/user/register",httpOptions
    //  {
    //   method: "POST",
    //   // headers: {
    //   //   Accept: "application/json",
    //   //   "Content-Type": "application/json",
    //   // },
    //   headers,
    //   body: JSON.stringify(this.signupForm.value)
    // }
    //).subscribe(
    console.log(this.signupForm.value);

    let sendData: any;
    sendData = {
      "name": this.signupForm.controls['name'].value,
      "password": this.signupForm.controls['password'].value,
      "email": this.signupForm.controls['email'].value,
    }
    // sendData.append(this.signupForm.controls['email'].value);
    // sendData.append(this.signupForm.controls['password'].value);
    // sendData.append(this.signupForm.controls['name'].value);
    console.log(sendData);
    debugger;
    if (this.signupForm.valid) {
      this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/user/register/", sendData).subscribe(
        res => {
          debugger;

          //alert("signup successfull");
          //this.signupForm.reset();
          this.router.navigate(['dashboard']);
          //localStorage.setItem('tkn', res.token);
          console.log(res);
        },
        err => {
          console.log(err);
          debugger;

          alert("something went wrong");
        }
      )
    }
    // }
  }
}
