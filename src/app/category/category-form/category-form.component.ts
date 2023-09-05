import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  categoryForm: FormGroup = undefined!;
  categoryId: number = undefined!;

  constructor(private formBuilder: FormBuilder
    , private categoryService: CategoryService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories()
    this.loadCategorybyId()
  }

  initCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      parent_id: ['']
    });
  }

  createCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData = this.categoryForm.value;
    categoryData.parent_id ? categoryData.parent_id : delete categoryData.parent_id
    this.categoryService.createCategory(categoryData)
      .subscribe(
        (response: any) => {
          this.toastr.success('Category created successfully')
          console.log('Category created successfully:', response);
          // Reset the form after successful creation
          this.categoryForm.reset();
          this.bsModalRef.hide()
        },
        (error: any) => {
          this.toastr.error(error.message)

          console.error('Error creating category:', error);
        }
      );
  }
  parentCategories = []


  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.parentCategories = response.data;
      },
      (error: any) => {

        this.toastr.error(error.message)
        console.error('Error loading categories:', error);
      }
    );
  }

  loadCategorybyId(): void {
    // Load the category data from the service based on the categoryId
    // and populate the form fields
    if (this.categoryId) {
      this.categoryService.getCategoryById(this.categoryId)
        .subscribe(
          (category) => {
            this.categoryForm.patchValue(category.data);
          },
          (error) => {

            this.toastr.error(error.message)
            console.error('Error loading category:', error);
          }
        );
    }
  }

  updateCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData = this.categoryForm.value;
    categoryData.parent_id ? categoryData.parent_id : delete categoryData.parent_id
    this.categoryService.updateCategory(this.categoryId, categoryData)
      .subscribe(
        (response) => {
          this.toastr.success("Category updated successfully")
          console.log('Category updated successfully:', response);
          this.bsModalRef.hide();
        },
        (error) => {

          this.toastr.error(error.message)
          console.error('Error updating category:', error);
        }
      );
  }
}