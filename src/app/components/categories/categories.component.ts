import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _ecomdataService:EcomdataService){}


  categories:Category[]=[]

  ngOnInit(): void {
    this._ecomdataService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data
      },
      
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        
      }
    })
  }
}
