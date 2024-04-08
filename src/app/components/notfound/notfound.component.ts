import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
 _router = inject(Router)

 returnHome(){
  this._router.navigate(['/home'])
 }
}
