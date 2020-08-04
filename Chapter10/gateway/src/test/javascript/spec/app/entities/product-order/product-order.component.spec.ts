/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { ProductOrderComponent } from '../../../../../../main/webapp/app/entities/product-order/product-order.component';
import { ProductOrderService } from '../../../../../../main/webapp/app/entities/product-order/product-order.service';
import { ProductOrder } from '../../../../../../main/webapp/app/entities/product-order/product-order.model';

describe('Component Tests', () => {

    describe('ProductOrder Management Component', () => {
        let comp: ProductOrderComponent;
        let fixture: ComponentFixture<ProductOrderComponent>;
        let service: ProductOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ProductOrderComponent],
                providers: [
                    ProductOrderService
                ]
            })
            .overrideTemplate(ProductOrderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductOrderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProductOrder(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productOrders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
