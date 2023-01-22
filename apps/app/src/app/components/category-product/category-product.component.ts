import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'lowgular-acms-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss'],
})
export class CategoryProductComponent implements OnInit, OnDestroy {

  category: string;

  products: Product[];

  isLoading: boolean;

  destroy$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.getCategoryProduct();
    });
  }

  private getCategoryProduct(): void {
    this.isLoading = true;
    this.productService.getCategoryProduct(this.category)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe((products: any) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
