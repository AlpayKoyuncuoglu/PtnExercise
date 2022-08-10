import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { compileNgModule } from '@angular/compiler';
import { FavouriteService } from '../services/favourite.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: any;
  favouriteProducts: Product[] = [];
  shouldShow = true;
  token: any;
  constructor(private cdr: ChangeDetectorRef, private favouriteService: FavouriteService, private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router) { }

  getElement() {
    debugger
  }
  ngOnInit(): void {
    debugger;
    if (localStorage.getItem("tkn") != null)
      this.token = localStorage.getItem("tkn");
    else (sessionStorage.getItem("tkn") != null)
    this.token = sessionStorage.getItem("tkn");
    debugger;

    // const httpHeaders = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'Authorization': token!
    // })
    const httpHeaders = new HttpHeaders(
      { 'access-token': this.token }
    )
    debugger;
    this.http.get<any>("https://assignment-api.piton.com.tr/api/v1/product/all", { headers: httpHeaders }).subscribe(
      res => {
        // this.products=res.products
        console.log(res.products);
        console.log(res);
        this.products = res.products;
      },
      err => {
        console.log(err);
      }
    )
  }
  onClick(event: any) {
    console.log(event);
    event;
    debugger;
  }

  addFavourites(id: any) {
    const idTo = id;
    //const token = localStorage.getItem("tkn");
    const httpHeaders = new HttpHeaders(
      { 'access-token': this.token }
    )
    this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/product/like", { productId: idTo }, { headers: httpHeaders }).subscribe(
      res => {
        debugger;

        let sendItem;
        //sendItem=this.products.filter(x=>x.id===idTo)
        sendItem = this.findTheElement(idTo);
        console.log(sendItem);
        this.favouriteService.addToCart(sendItem);
        console.log(res);
      },
      err => {
        console.log(err);
        alert("something went wrong");
      }
    )
  }

  getFavourites() {
    this.favouriteProducts = this.favouriteService.getProducts();
    //const myClonedArray  = Object.assign([], this.favouriteProducts);
    // for(let x of myClonedArray)
    debugger;

    // for (let i = 1; i <= myClonedArray.length; i++) {
    //   // console.log(x);
    //   // this.favouriteProducts.push(...x[i]);
    //   // this.favouriteProducts[i] = myClonedArray[i][i];
    //   myClonedArray[i].push(this.favouriteProducts[i]);
    //   debugger;
    // }
    //console.log(myClonedArray);
    console.log(this.products);
    console.log("favori ürünler");

    console.log(this.favouriteProducts);
    debugger;

  }

  removeFavourites(id: any) {
    const idTo = id;
    //const token = localStorage.getItem("tkn");
    const httpHeaders = new HttpHeaders(
      { 'access-token': this.token }
    )
    this.http.post<any>("https://assignment-api.piton.com.tr/api/v1/product/unlike", { productId: idTo }, { headers: httpHeaders }).subscribe(
      res => {
        debugger;
        let sendItem;
        sendItem = this.findTheElement(idTo);
        console.log(sendItem);
        this.favouriteService.removeCartItem(sendItem);

        alert("remove is successfull");
        console.log(res);
      },
      err => {
        console.log(err);
        alert("something went wrong");
      }
    )
  }

  findTheElement(id: any) {
    return this.products.filter((x: any) => x.id === id)
  }


  logOut() {

    localStorage.removeItem("tkn");
    sessionStorage.removeItem("tkn");
    this.router.navigate(["login"]);

    //this.loggedIn = false;
  }
}


