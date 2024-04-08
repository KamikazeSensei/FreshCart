import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit{

constructor(private _activatedRoute:ActivatedRoute , private _httpClient:HttpClient){}

orders:Order[]=[]
order: Order={} as Order

getOrders(userId:string):Observable<any>{
  return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`)
}

ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe({
    next:(parameter)=>{
      let userId = parameter.get('userId')
      let orderId = parameter.get('orderId')
      console.log(userId);
      console.log(orderId);
      this.getOrders(userId!).subscribe({
        next:(response)=>{
          console.log(response);
          
          this.orders = response
          this.order = this.orders.find(order => order?._id == orderId)!
        }
      })

      }
    }
  )
}

}
