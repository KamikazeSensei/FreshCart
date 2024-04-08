import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{

constructor(private _authService:AuthService , private _cartService:CartService , private _renderer2:Renderer2){}

  cartNo:number = 0

  @ViewChild('navBar') navElement!:ElementRef

  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY >300){
      this._renderer2.addClass(this.navElement.nativeElement, 'shadow')
      this._renderer2.addClass(this.navElement.nativeElement, 'px-5')

    }else{
      this._renderer2.removeClass(this.navElement.nativeElement, 'shadow')
      this._renderer2.removeClass(this.navElement.nativeElement, 'px-5')
    }
  }

  ngOnInit(): void {
    this._cartService.cartItemsNo.subscribe({
      next:(number)=>{
        this.cartNo = number
      }
    })

    this._cartService.getUserCart().subscribe({
      next:(response)=>{
        
        let totalNumber:number = 0 

      for(let i=0 ; i<response.data.products.length ; i++){

        totalNumber += response.data.products[i].count 
      }
      
      this._cartService.cartItemsNo.next(totalNumber)
      }
    })
  }

  

  logOutUser():void{
  this._authService.logOut();
  }


  
}
