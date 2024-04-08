import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

constructor(private _ecomdataService:EcomdataService , private _cartService:CartService , private _toastr:ToastrService , private _wishlistService:WishlistService){}

products : Product[]=[]
categories : Category[] = []

searchTerm : string = ''

wishlistData: string[] = []

addToCart(id:string):void{
  this._cartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);

      let totalNumber:number = 0 

      for(let i=0 ; i<response.data.products.length ; i++){

        totalNumber += response.data.products[i].count 
      }
      
      this._cartService.cartItemsNo.next(totalNumber)

      console.log(this._cartService.cartItemsNo);
      
      this._toastr.success('Product Added successfully')
    },
    error:(err)=>{
      console.log(err);
      this._toastr.error('Something Went Wrong')
    }
  })
}

// Owl Carousel


mainSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed: 700,
  items:1,
  nav: false
}




categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed: 700,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}

// ###################


ngOnInit(): void {

  // get all products
  this._ecomdataService.getAllProducts().subscribe({

    next:(response)=>{
      this.products = response.data
    },
    error:(err:HttpErrorResponse)=>{
    console.log(err);

    }
  })

// get categories

  this._ecomdataService.getCategories().subscribe({
    next:(response)=>{
      this.categories = response.data
      
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

// ###################

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
