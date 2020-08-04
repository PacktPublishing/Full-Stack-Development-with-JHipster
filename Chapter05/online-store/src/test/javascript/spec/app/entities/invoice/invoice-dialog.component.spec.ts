/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { InvoiceDialogComponent } from '../../../../../../main/webapp/app/entities/invoice/invoice-dialog.component';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice/invoice.service';
import { Invoice } from '../../../../../../main/webapp/app/entities/invoice/invoice.model';
import { ProductOrderService } from '../../../../../../main/webapp/app/entities/product-order';

describe('Component Tests', () => {

    describe('Invoice Management Dialog Component', () => {
        let comp: InvoiceDialogComponent;
        let fixture: ComponentFixture<InvoiceDialogComponent>;
        let service: InvoiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [InvoiceDialogComponent],
                providers: [
                    ProductOrderService,
                    InvoiceService
                ]
            })
            .overrideTemplate(InvoiceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Invoice(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.invoice = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Invoice();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.invoice = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'invoiceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
