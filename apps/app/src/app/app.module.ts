import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
