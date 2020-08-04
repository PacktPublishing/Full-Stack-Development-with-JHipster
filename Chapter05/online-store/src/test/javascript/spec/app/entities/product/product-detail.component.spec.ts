/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { ProductDetailComponent } from '../../../../../../main/webapp/app/entities/product/product-detail.component';
import { ProductService } from '../../../../../../main/webapp/app/entities/product/product.service';
import { Product } from '../../../../../../main/webapp/app/entities/product/product.model';

describe('Component Tests', () => {

    describe('Product Management Detail Component', () => {
        let comp: ProductDetailComponent;
        let fixture: ComponentFixture<ProductDetailComponent>;
        let service: ProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductDetailComponent],
                providers: [
                    ProductService
                ]
            })
            .overrideTemplate(ProductDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Product(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.product).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
