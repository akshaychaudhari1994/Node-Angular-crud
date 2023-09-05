import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from '../services/product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from '../services/category.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: Product[] = [];
  categories: any[] = [];
  bsModalRef!: BsModalRef;

  constructor(private categoryService: CategoryService
    , private productService: ProductService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = [...res.data];
      },
      error: (error: any) => {
        this.toastr.error(error.message)
      }
    })
  }

  openCatForm() {
    this.bsModalRef = this.modalService.show(ProductFormComponent,
      { class: 'modal-xl' });
    this.bsModalRef.onHidden!.subscribe(() => {
      this.loadProducts();
    });
  }


  openEditModal(productId: any): void {
    const initialState = {
      productId: productId
    };
    this.bsModalRef = this.modalService.show(ProductFormComponent, { initialState });
    this.bsModalRef.content.bsModalRef = this.bsModalRef;
    this.bsModalRef.onHidden!.subscribe(() => {
      this.loadProducts();
    });
  }

  deleteCategory(productId: any): void {

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId)
        .subscribe({
          next: (data: any) => {
            this.loadProducts();
            this.toastr.success('product deleted successfully')
          },
          error: (error: any) => {
            this.toastr.error(error.message)
          }
        });
    }
  }

  getCategoryNames(id: any) {
    let product = this.products.find(product => product.id === id)
    return product?.categories.map((category: { name: any; }) => category.name).join(', ') || [];
  }
}
