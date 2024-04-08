import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
constructor(private _formBuilder:FormBuilder , private _activatedRoute:ActivatedRoute , private _cartService:CartService , private _router:Router){}

  cartId:string | null= ''

  


ngOnInit(): void {
  this._activatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.cartId = params.get('cartId')
    }
  })
}

checkoutForm:FormGroup = this._formBuilder.group({

  details:['',Validators.required],
  phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:['',Validators.required],
  paymentMethod: ['online', Validators.required]
})

address:object = {}


handleForm():void{

this.address= {
  details: this.checkoutForm.value.details,
  phone:this.checkoutForm.value.phone,
  city:this.checkoutForm.value.city
}
console.log(this.address);
if(this.checkoutForm.value.paymentMethod =='online'){

  this._cartService.onlineCheckout(this.cartId!,this.address).subscribe({
    next:(response)=>{
      if(response.status == 'success'){
        window.open(response.session.url , '_self')
      }
      
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err);
      
    }
  })

}else if(this.checkoutForm.value.paymentMethod =='cash'){
  this._cartService.cashCheckout(this.cartId!,this.address).subscribe({
    next:()=>{
      alert('Order Submitted')
      this._router.navigate(['/allorders'])
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err);
      
    }
  })
}

}

}
