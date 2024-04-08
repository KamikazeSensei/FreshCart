import { authGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BrandsdetailsComponent } from './components/brandsdetails/brandsdetails.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  // the main layout
  {path:'', canActivate:[authGuard] , component:BlankLayoutComponent , title:'Fresh Cart' , children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent },
    {path:'products', component:ProductsComponent,},
    {path: 'details/:id', component: DetailsComponent},
    {path:'cart', component:CartComponent},
    {path:'brands', component:BrandsComponent},
    {path:'brandsdetails/:id', component:BrandsdetailsComponent},
    {path:'categories', component:CategoriesComponent},
    {path:'categorydetails/:id', component:CategorydetailsComponent},
    {path:'checkout/:cartId', component:CheckoutComponent},
    {path:'allorders', component:AllordersComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'orderdetails/:userId/:orderId', component:OrderdetailsComponent},
    

]},
  // auth layout
  {path:'',component:AuthLayoutComponent , children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgot',component:ForgotpasswordComponent},
  ]},
  // not found 
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
