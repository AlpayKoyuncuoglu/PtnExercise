import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    console.log(this.cartItemList);
    debugger;
    return this.cartItemList;
  }
  //  return this.products.filter((x: any) => x.id === id)


  addToCart(product: any) {
    debugger;
    let isValid = this.cartItemList.filter((x: any) => x.id === product[0].id)
    console.log(isValid);
    debugger;
    if (isValid.length == 0) {
      this.cartItemList.push(...product);
      alert("adding successfull");
    }
    
    else {
      alert("this product added before");
    }


    //this.cartItemList.push(...product);
    debugger;
  }

  removeCartItem(product: any) {
    debugger;
    this.cartItemList.map((a: any, index: any) => {
      if (product[0].id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    console.log(this.cartItemList);

  }

}
