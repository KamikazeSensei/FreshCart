import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
constructor(private _activatedRoute:ActivatedRoute , private _ecomdataService:EcomdataService , private _cartService:CartService , private _toastr:ToastrService ,
  private _wishlistService:WishlistService){}


productDetails : Product = {} as Product

wishlistData : string[] = []


addToCart(id:string):void{
  this._cartService.addToCart(id).subscribe({

    next:(response)=>{
      
      let totalNumber:number = 0 

      for(let i=0 ; i<response.data.products.length ; i++){

        totalNumber += response.data.products[i].count 
      }
      
      this._cartService.cartItemsNo.next(totalNumber)

      this._toastr.success('Product Added Successfully')
    },


    error:(err)=>{
      console.log(err);
      this._toastr.error('Something Went Wrong')
    }
  })
}


// owl carousel



productSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  items:1,
  nav: false
}

// #######################################

ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe({

    next:(parameter)=>{
     let productId:any = parameter.get('id')

      this._ecomdataService.getProductDetails(productId).subscribe({

        next:(response)=>{

          this.productDetails = response.data

        },

      })
    },
    error(err:HttpErrorResponse){
      console.log(err);
    }
  })

  // get wishlist

  this._wishlistService.getWishList().subscribe({
    next:(response)=>{
      const newResponse = response.data.map((item:any)=>item._id)
      this.wishlistData = newResponse
    }
  })
}

// #######################################

// adding and removing wishlist

addToWish(productId:string):void{
  this._wishlistService.addToWishList(productId).subscribe({
    next:(response)=>{
      console.log(response);
      this._toastr.success('Product Added to Wishlist')
      this.wishlistData = response.data
    }
  })
}

removeFromWish(productId:string):void{
  this._wishlistService.removeFromWishList(productId).subscribe({
    next:(response)=>{
      this._toastr.success('Product Removed From Wishlist')
      this.wishlistData = response.data
    }
  })
}

}
