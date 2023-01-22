import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'lowgular-acms-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product | undefined;

  destroy$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getProduct(id);
    });
  }

  private getProduct(id: number): void {
    this.productService.getProduct(id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((product: Product) => {
        this.product = product;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
