import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _authService:AuthService , private _router:Router){}

errorMsg:string = ''
isLoading:boolean = false

loginForm:FormGroup = new FormGroup({

  email: new FormControl('', Validators.required),
  password:new FormControl('', Validators.required)

})

handleLogin(){

this.isLoading=true

this._authService.setLogin(this.loginForm.value).subscribe({

next:(response)=>{
if(response.message =='success'){

  this.isLoading=false
  
  // console.log(response);

  localStorage.setItem('userToken', response.token)

  this._authService.decodeUserData

  this._router.navigate(['/home'])
}
},

error:(err:HttpErrorResponse)=>{
console.log(err);
this.errorMsg=err.error.message
this.isLoading=false
}

})

}


}
