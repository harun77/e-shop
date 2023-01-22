import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'lowgular-acms-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit, OnDestroy {

  productForm: FormGroup;

  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl(undefined, Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  private getValue(name: string): string | number {
    return this.productForm.get(name)?.value;
  }

  add(): void {
    if (this.productForm.invalid) {
      return;
    }
    const newProduct = {
      title: this.getValue('title'),
      price: this.getValue('price'),
      description: this.getValue('description'),
      category: this.getValue('category'),
      image: this.getValue('image')
    }

    this.productService.addProduct(newProduct)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['/products']);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
