import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _httpClient:HttpClient) { }

  getAllProducts(pageNum:number = 1):Observable<any>{
   return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/products?page=${pageNum}`)
  }

  getProductDetails(id:string):Observable<any>{
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  }

  getCategories():Observable<any>{
    return this._httpClient.get('https://route-ecommerce.onrender.com/api/v1/categories')
  }

  getCategoryDetails(id:string|null):Observable<any>{
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`)
  }

  getBrands():Observable<any>{
    return this._httpClient.get('https://route-ecommerce.onrender.com/api/v1/brands')
  }

  getBrandDetails(id:string | null):Observable<any>{
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
  }
}
