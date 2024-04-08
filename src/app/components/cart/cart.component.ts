import { Cart } from './../../shared/interfaces/cart';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private _cartService:CartService , private _toastr:ToastrService){}

  cartInfo : Cart  = {} as Cart
 
  ngOnInit(): void {

    this._cartService.getUserCart().subscribe({
      next:(response)=>{
        
        
        this.cartInfo=response.data
      },

      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })

  }

//  ##########################################


  removeItem(id:string):void{
    this._cartService.removeCartItem(id).subscribe({
      next:(response)=>{
        this.cartInfo = response.data
        
        let totalNumber:number = 0 

      for(let i=0 ; i<response.data.products.length ; i++){

        totalNumber += response.data.products[i].count 
      }
      
      this._cartService.cartItemsNo.next(totalNumber)

      this._toastr.success('Item Removed for Cart')
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

   //  ##########################################

  changeCount(id:string, count:number):void{
    this._cartService.updateItemCount(id,count).subscribe({
      next:(response)=>{
        this.cartInfo=response.data

        let totalNumber:number = 0 

      for(let i=0 ; i<response.data.products.length ; i++){

        totalNumber += response.data.products[i].count 
      }
      
      this._cartService.cartItemsNo.next(totalNumber)
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }

   //  ##########################################

  clear():void{
    this._cartService.clearCart().subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          this.cartInfo = {} as Cart
        }
        
        this._cartService.cartItemsNo.next(0)
        this._toastr.success('All Items Removed from Cart')

      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        this._toastr.error('Something Went Wrong!')
      }
    })
  }
  
}


