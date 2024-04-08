import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from 'src/app/shared/interfaces/wishlist';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private _wishlistService:WishlistService , private _cartService:CartService , private _toastr:ToastrService){}

  wishlistDetails:Wishlist = {} as Wishlist

  ngOnInit(): void {
    this._wishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log(response);
        this.wishlistDetails=response
      }
    })
    
    
  }

  removeItem(productId:string):void{
    this._wishlistService.removeFromWishList(productId).subscribe({
      next:(response)=>{
        console.log(response);
        
        this._wishlistService.getWishList().subscribe({
          next:(response)=>{
            console.log(response);
            this.wishlistDetails=response
            this._toastr.success('Product Removed from Wishlist')
          }  
        })
      }
    })
  }


  // ###########################################################

  // adding to cart removes the item from the wishlist

  addToCart(productId:string):void{
    this._cartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
  
        let totalNumber:number = 0 
  
        for(let i=0 ; i<response.data.products.length ; i++){
  
          totalNumber += response.data.products[i].count 
        }
        
        this._cartService.cartItemsNo.next(totalNumber)
  
        console.log(this._cartService.cartItemsNo);
        
        
        
        this._wishlistService.removeFromWishList(productId).subscribe({
          next:(response)=>{
            console.log(response);
            
            this._wishlistService.getWishList().subscribe({
              next:(response)=>{
                console.log(response);
                this.wishlistDetails=response
                this._toastr.success('Product Added to Cart')
              }  
            })
          }
        })

      },
      error:(err)=>{
        console.log(err);
        this._toastr.error('Something Went Wrong')
      }
    })

  }
}
