import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from './interfaces/brand';

@Pipe({
  name: 'brandsearch'
})
export class BrandsearchPipe implements PipeTransform {

  transform(brand:Brand[], searchTerm:string): Brand[] {
    return brand.filter((product)=>product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  

}
