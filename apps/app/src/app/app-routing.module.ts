import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryProductComponent } from "./components/category-product/category-product.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductsComponent } from "./components/products/products.component";

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: ':category/products', component: CategoryProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'add-product', component: CreateProductComponent },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
