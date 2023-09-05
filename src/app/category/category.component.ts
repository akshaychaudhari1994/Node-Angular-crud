import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: any[] = [];
  bsModalRef!: BsModalRef;

  constructor(private categoryService: CategoryService,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openCatForm() {
    this.bsModalRef = this.modalService.show(CategoryFormComponent,
      { class: 'modal-xl' });
    this.bsModalRef.onHidden!.subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = [...response.data];
      }, error: (error: any) => {
        this.toastr.error(error.message)
      }
    })
  }

  openEditModal(categoryId: number): void {
    const initialState = {
      categoryId: categoryId
    };
    this.bsModalRef = this.modalService.show(CategoryFormComponent, { initialState });
    this.bsModalRef.content.bsModalRef = this.bsModalRef;
    this.bsModalRef.onHidden!.subscribe(() => {
      this.loadCategories();
    });
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId)
        .subscribe({
          next: (data: any) => {
            this.loadCategories()
            this.toastr.success("Category deleted successfully")
          }, error: (error: any) => {
            this.toastr.error(error.message)
          }
        })
    }
  }
}
