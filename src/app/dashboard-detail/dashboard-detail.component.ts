import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {
  product: any;
  productId: any;
  token: any;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    debugger;

    debugger;
    if (localStorage.getItem("tkn") != null)
      this.token = localStorage.getItem("tkn");
    else (sessionStorage.getItem("tkn") != null)
    this.token = sessionStorage.getItem("tkn");
    // console.log(token);
    // const httpHeaders = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'Authorization': token!
    // })
    const httpHeaders = new HttpHeaders(
      { 'access-token': this.token }
    )
    this.http.get<any>("https://assignment-api.piton.com.tr/api/v1/product/get/" + this.productId, { headers: httpHeaders }).subscribe(
      res => {
        // this.products=res.products
        //console.log(res.products);
        console.log(res);
        this.product = res.product;

      },
      err => {
        console.log(err);
      }
    )
  }

}
