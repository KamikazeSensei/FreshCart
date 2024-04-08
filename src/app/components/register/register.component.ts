
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private _authservice:AuthService , private _router:Router){}

errorMsg:string = ''
isLoading:boolean = false

// Registration Form

registerForm:FormGroup = new FormGroup({
  name: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
  email: new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  rePassword: new FormControl(''),
  phone: new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),

} , {validators:[this.confirmPassword]} as FormControlOptions);


confirmPassword(group:FormGroup):void{

  let password = group.get('password');
  let rePassword = group.get('rePassword');

if(rePassword?.value == ''){
  rePassword?.setErrors({required : true})
}
else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch : true})
  }

}

handleSignup():void {



if(this.registerForm.valid){
  
  this.isLoading=true

  this._authservice.setRegister(this.registerForm.value).subscribe({

    next:(response)=>{

      if(response.message == 'success'){
        this.isLoading=false
        this._router.navigate(['/login'])

        }

    },

    error:(err:HttpErrorResponse)=>{
      this.isLoading=false
      console.log(err.error.message);
      this.errorMsg = err.error.message
    }
  })
}

}
}
