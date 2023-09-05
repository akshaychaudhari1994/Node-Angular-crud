import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from '../product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup = undefined!;
  productId: number = undefined!;

  constructor(private formBuilder: FormBuilder
    , private categoryService: CategoryService,
    public bsModalRef: BsModalRef, private toastr: ToastrService,
    private productService: ProductService) { }

  ngOnInit() {
    this.createProductForm();
    this.loadCategories()
    this.loadproductbyId()
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryIds: [[]],
      price: ['', Validators.required]
    });
  }

  parentCategories: any = []
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.parentCategories = response.data;
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  submitForm() {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = {
      name: this.productForm.value.name,
      categoryIds: this.productForm.value.categoryIds,
      price: this.productForm.value.price
    };

    this.productService.createProduct(product).subscribe(() => {
      this.bsModalRef.hide();
      console.log("product created");
      this.toastr.success('product created successfully')

    }, error => { })
  }


  loadproductbyId(): void {
    // Load the category data from the service based on the categoryId
    // and populate the form fields
    if (this.productId) {
      this.productService.getProduct(this.productId)
        .subscribe(
          (res) => {
            this.productForm.patchValue(res.data);
            this.productForm.controls['categoryIds'].patchValue(res.data?.categories.map((i: { id: any; }) => i.id))
          },
          (error) => {
            console.error('Error loading product:', error);

          }
        );
    }
  }

  updateProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;
    productData.categoryIds ? productData.categoryIds : delete productData.categoryIds

    this.productService.updateProduct(this.productId, productData)
      .subscribe(
        (response) => {
          this.toastr.success('product updated successfully')

          console.log('product updated successfully:', response);
          this.bsModalRef.hide();
        },
        (error) => {
          this.toastr.error(error.message);

          console.error('Error updating category:', error);
        }
      );
  }
}

