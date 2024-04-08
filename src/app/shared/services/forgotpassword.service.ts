import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private _httpClient:HttpClient) { }

  forgotPassword(email:object):Observable<any>{
    return this._httpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords' , email)
  }

  resetCode(code:object):Observable<any>{
    return this._httpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode', code)
  }

  newPassword(newData:object):Observable<any>{
    return this._httpClient.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword' , newData)
  }
}
