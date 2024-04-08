import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpclient:HttpClient) { }


  cartItemsNo: BehaviorSubject<number> = new BehaviorSubject(0)

  headers:any = {token: localStorage.getItem('userToken')}

// add item to cart function

  addToCart(productId:string):Observable<any>{
    return this._httpclient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {"productId": productId} 
  
    )
  }

// ######################################

// get cart details

  getUserCart():Observable<any>{
    return this._httpclient.get('https://ecommerce.routemisr.com/api/v1/cart'  
    )
  }

// ######################################

  // remove an item from cart

  removeCartItem(productId:string):Observable<any>{
    return this._httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`  
    )
  }

// ######################################

  // modify item count

  updateItemCount(productId:string , count:number) : Observable<any> {
    return this._httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
    {
      "count": count
    }
    )
  }

  // ######################################

// clear Cart

  clearCart():Observable<any>{
    return this._httpclient.delete('https://ecommerce.routemisr.com/api/v1/cart/')
  }


  // checkout

  onlineCheckout(cartId:string , address:object):Observable<any>{
    return this._httpclient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200` , 
    {
      shippingAddress: address
    }
    )
  }

  cashCheckout(cartId:string , address:object):Observable<any>{
    return this._httpclient.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}` ,
    {
      shippingAddress: address
    }
    )
  }
}
