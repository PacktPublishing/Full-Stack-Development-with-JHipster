/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { StoreTestModule } from '../../../test.module';
import { OrderItemComponent } from '../../../../../../main/webapp/app/entities/order-item/order-item.component';
import { OrderItemService } from '../../../../../../main/webapp/app/entities/order-item/order-item.service';
import { OrderItem } from '../../../../../../main/webapp/app/entities/order-item/order-item.model';

describe('Component Tests', () => {

    describe('OrderItem Management Component', () => {
        let comp: OrderItemComponent;
        let fixture: ComponentFixture<OrderItemComponent>;
        let service: OrderItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [OrderItemComponent],
                providers: [
                    OrderItemService
                ]
            })
            .overrideTemplate(OrderItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OrderItem(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.orderItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
