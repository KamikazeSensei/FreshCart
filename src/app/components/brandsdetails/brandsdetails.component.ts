import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-brandsdetails',
  templateUrl: './brandsdetails.component.html',
  styleUrls: ['./brandsdetails.component.css']
})
export class BrandsdetailsComponent implements OnInit{

constructor(private _ecomdataService:EcomdataService , private _activatedRoute:ActivatedRoute , private _cartService:CartService , private _toastr:ToastrService , private _wishlistService:WishlistService){}


brandId:string | null = ''

products:Product[]= []

filteredProducts:Product[]=[]

searchTerm : string = ''

wishlistData: string[] = []

ngOnInit(): void {
  
this._activatedRoute.paramMap.subscribe({
  next:(params)=>{
   this.brandId =  params.get('id')
  }
})

this._ecomdataService.getBrandDetails(this.brandId).subscribe({
  next:(response)=>{
    
    
  },
  error:(err:HttpErrorResponse)=>{
    console.log(err);
    
  }
})

this._ecomdataService.getAllProducts().subscribe({
  next:(response)=>{
    
    this.products = response.data
    
    
    let newProducts = this.products.filter(item=> item.brand._id == this.brandId)
    
    
    this.filteredProducts = newProducts
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

}
