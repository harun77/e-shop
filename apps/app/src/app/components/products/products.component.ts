import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil, zip } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'lowgular-acms-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];

  categories: string[];

  sortBy: string;

  isLoading: boolean;

  pageLoading: boolean;

  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    const productsSub = this.productService.getProducts();
    const categoriesSub = this.productService.getCategories();
    zip([productsSub, categoriesSub]).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(([products, categories]) => {
      this.products = products;
      this.categories = categories;
    });
  }

  detail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  categoryProduct(category: string): void {
    this.router.navigate([`${category}/products`]);
  }

  deleteProduct(id: number, event: any): void {
    event.stopPropagation();
    this.pageLoading = true;
    this.productService.deleteProduct(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.pageLoading = false )
      )
      .subscribe();
  }

  sort(): void {
    this.productService.sortProducts(this.sortBy)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((products: any) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
