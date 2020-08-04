import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductCategory } from './product-category.model';
import { ProductCategoryPopupService } from './product-category-popup.service';
import { ProductCategoryService } from './product-category.service';

@Component({
    selector: 'jhi-product-category-dialog',
    templateUrl: './product-category-dialog.component.html'
})
export class ProductCategoryDialogComponent implements OnInit {

    productCategory: ProductCategory;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private productCategoryService: ProductCategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productCategoryService.update(this.productCategory));
        } else {
            this.subscribeToSaveResponse(
                this.productCategoryService.create(this.productCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProductCategory>) {
        result.subscribe((res: ProductCategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductCategory) {
        this.eventManager.broadcast({ name: 'productCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-product-category-popup',
    template: ''
})
export class ProductCategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productCategoryPopupService: ProductCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent as Component, params['id']);
            } else {
                this.productCategoryPopupService
                    .open(ProductCategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
