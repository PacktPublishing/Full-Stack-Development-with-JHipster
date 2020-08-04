import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-product-category',
    templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
productCategories: ProductCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productCategoryService: ProductCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.productCategoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.productCategories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductCategory) {
        return item.id;
    }
    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
