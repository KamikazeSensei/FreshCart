import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { MyHttpInterceptor } from './shared/my-http.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './shared/loading.interceptor';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BrandsdetailsComponent } from './components/brandsdetails/brandsdetails.component';
import { BrandsearchPipe } from './shared/brandsearch.pipe';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    SearchPipe,
    CheckoutComponent,
    AllordersComponent,
    OrderdetailsComponent,
    WishlistComponent,
    CategorydetailsComponent,
    BrandsdetailsComponent,
    BrandsearchPipe,
    ForgotpasswordComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:MyHttpInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
