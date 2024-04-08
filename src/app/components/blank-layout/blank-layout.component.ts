import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
  animations: [
    trigger('fadeInOut', [state('void', style({

        opacity: 0

      })),

      transition('void <=> *', animate(500))
    ])
  ]
})


export class BlankLayoutComponent {

constructor(private _renderer2:Renderer2){}


isVisible: boolean = false;

@ViewChild('upBtn') btnElement!:ElementRef

@HostListener('window:scroll')

onScroll():void{
  if(scrollY >500){

   this.isVisible=true

  }else{
    
   this.isVisible=false
  }
}

  goUp():void{
    window.scrollTo(0,0)
  }
}
