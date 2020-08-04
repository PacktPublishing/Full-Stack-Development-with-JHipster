/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { CustomerDetailComponent } from '../../../../../../main/webapp/app/entities/customer/customer-detail.component';
import { CustomerService } from '../../../../../../main/webapp/app/entities/customer/customer.service';
import { Customer } from '../../../../../../main/webapp/app/entities/customer/customer.model';

describe('Component Tests', () => {

    describe('Customer Management Detail Component', () => {
        let comp: CustomerDetailComponent;
        let fixture: ComponentFixture<CustomerDetailComponent>;
        let service: CustomerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CustomerDetailComponent],
                providers: [
                    CustomerService
                ]
            })
            .overrideTemplate(CustomerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Customer(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
