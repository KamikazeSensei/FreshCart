import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient , private _router:Router) { }

  userData:any

logOut():void{
  localStorage.removeItem('userToken')
  this._router.navigate(['/login'])
}

  decodeUserData(){
    if(localStorage.getItem('userToken')!=null){

      let encodedToken:any = localStorage.getItem('userToken')

       let decodedToken = jwtDecode(encodedToken)
       
      this.userData = decodedToken
    }
  }



// register API function

  setRegister(userData:object) : Observable<any>{
    
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData)
  }

// Login API function

  setLogin(userData:object): Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData)
  }
}
