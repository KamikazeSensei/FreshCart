import { Order } from './../../shared/interfaces/order';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{

  constructor(private _httpClient:HttpClient , private _authService:AuthService){}


  orders:Order[] = []

  userId:string = ''

  getUserOrders(userId:string):Observable<any>{
      return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`)
  }



  ngOnInit(): void {

   
    this._authService.decodeUserData()
    this.userId=this._authService.userData.id
    this.getUserOrders(this._authService.userData.id).subscribe({
      next:(response)=>{
       
        this.orders=response
      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })

  }
}
