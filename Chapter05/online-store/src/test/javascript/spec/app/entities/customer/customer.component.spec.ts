/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { StoreTestModule } from '../../../test.module';
import { CustomerComponent } from '../../../../../../main/webapp/app/entities/customer/customer.component';
import { CustomerService } from '../../../../../../main/webapp/app/entities/customer/customer.service';
import { Customer } from '../../../../../../main/webapp/app/entities/customer/customer.model';

describe('Component Tests', () => {

    describe('Customer Management Component', () => {
        let comp: CustomerComponent;
        let fixture: ComponentFixture<CustomerComponent>;
        let service: CustomerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [CustomerComponent],
                providers: [
                    CustomerService
                ]
            })
            .overrideTemplate(CustomerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Customer(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
