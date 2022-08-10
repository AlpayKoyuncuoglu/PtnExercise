// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccountService {
//   loginForm:any
//   constructor() { }

//   login(loginForm:any) {
//     this.loginForm=loginForm;
//     debugger;
//     console.log(this.loginForm);
//     console.log(this.loginForm.controls['email'].value);
//     var checkMail = this.loginForm.controls['email'].value
//     this.loginClicked = true;
//     this.loginForm.markAllAsTouched();
//     validationEmail()
//     // this.emaildata=validationEmail(checkMail);
//     // console.log(this.emaildata)
//     debugger;

//     //  this.isEmailValid = validateEmail(this.email);
//     // console.log(this.isEmailValid);

//     if (this.loginForm.valid) {
//       this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/user/login", this.loginForm.value).subscribe(
//         res => {
//           debugger;

//           alert("signup successfull");
//           //this.signupForm.reset();
//           this.router.navigate(['dashboard']);
//           localStorage.setItem('tkn', res.token);
//           this.loggedIn = true;
//           console.log(res);
//         },
//         err => {
//           console.log(err);
//           debugger;

//           alert("something went wrong");
//         }
//       )
//     }


//   }

//   isLoggedIn() {
//     return this.loggedIn;
//   }

//   logOut() {
//     localStorage.removeItem("tkn");
//     this.loggedIn = false;
//   }
// }
