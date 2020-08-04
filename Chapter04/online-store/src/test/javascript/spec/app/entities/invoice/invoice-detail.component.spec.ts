/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { InvoiceDetailComponent } from '../../../../../../main/webapp/app/entities/invoice/invoice-detail.component';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice/invoice.service';
import { Invoice } from '../../../../../../main/webapp/app/entities/invoice/invoice.model';

describe('Component Tests', () => {

    describe('Invoice Management Detail Component', () => {
        let comp: InvoiceDetailComponent;
        let fixture: ComponentFixture<InvoiceDetailComponent>;
        let service: InvoiceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [InvoiceDetailComponent],
                providers: [
                    InvoiceService
                ]
            })
            .overrideTemplate(InvoiceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Invoice(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.invoice).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
