import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './../../shared/interfaces/wishlist';
import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

constructor(private _ecomdataService:EcomdataService , private _cartService:CartService , private _toastr:ToastrService , private _wishlistService:WishlistService){}

products : Product[]=[]

searchTerm : string = ''

wishlistData: string[] = []

// pagination properties

pageSize:number = 0;
currentPage:number = 1;
totalItems:number = 0;

ngOnInit(): void {

  this._ecomdataService.getAllProducts().subscribe({

    next:(response)=>{
      this.products = response.data
      this.pageSize= response.metadata.limit
      this.currentPage=response.metadata.currentPage
      this.totalItems=response.results
    },
    error:(err:HttpErrorResponse)=>{
    console.log(err);

    }
  })
}


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


pageChanged(event:any):void{
  this._ecomdataService.getAllProducts(event).subscribe({

    next:(response)=>{
      this.products = response.data
      this.pageSize= response.metadata.limit
      this.currentPage=response.metadata.currentPage
      this.totalItems=response.results
    },
    error:(err:HttpErrorResponse)=>{
    console.log(err);

    }
  })
}

}
