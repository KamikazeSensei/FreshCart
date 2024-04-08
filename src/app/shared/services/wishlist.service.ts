import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _httpClient:HttpClient) { }



  getWishList():Observable<any>{
    return this._httpClient.get('https://route-ecommerce.onrender.com/api/v1/wishlist')
  }

  
  addToWishList(productId:string):Observable<any>{
    return this._httpClient.post('https://route-ecommerce.onrender.com/api/v1/wishlist' ,
    {
      
        productId : productId
      
    })
    
  }


  removeFromWishList(productId:string):Observable<any>{
    return this._httpClient.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`)
  }


}
