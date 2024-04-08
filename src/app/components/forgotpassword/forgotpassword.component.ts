import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotpasswordService } from 'src/app/shared/services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(private _forgotpasswordService:ForgotpasswordService , private _router:Router , private _toastr:ToastrService){}

  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;

  savedEmail:string = ''

  msg:string = ''
  errMsg:string = ''

  forgotForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required , Validators.email])
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('',Validators.required)
  })

  newPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('',[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  })

  forgotPassword():void{

    let email = this.forgotForm.value

    this.savedEmail = email.email

    this._forgotpasswordService.forgotPassword(email).subscribe({
      next:(response)=>{
        
        this.msg = response.message
        this.step1 = false
        this.step2 = true
      },
      error:(err:HttpErrorResponse)=>{
        
        this.errMsg = err.error.message
      }
    })
  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value
    this._forgotpasswordService.resetCode(resetCode).subscribe({
      next:(response)=>{
       
        this.msg = 'Reset Code Verified'
        this.step2 = false
        this.step3 = true
      },
      error:(err:HttpErrorResponse)=>{
        
        this.errMsg = err.error.message
      }
    })
  }

  newPassword():void{
    let newData = this.newPasswordForm.value
    newData.email = this.savedEmail

    this._forgotpasswordService.newPassword(newData).subscribe({
      next:(response)=>{ 
        if(response.token){
          localStorage.setItem('userToken' , response.token)
          this._toastr.success('Password Changed Successfully')
          this._router.navigate(['/home'])
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.errMsg = err.error.message
      }
    })
  }

}
