/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ShipmentDialogComponent } from '../../../../../../main/webapp/app/entities/shipment/shipment-dialog.component';
import { ShipmentService } from '../../../../../../main/webapp/app/entities/shipment/shipment.service';
import { Shipment } from '../../../../../../main/webapp/app/entities/shipment/shipment.model';
import { InvoiceService } from '../../../../../../main/webapp/app/entities/invoice';

describe('Component Tests', () => {

    describe('Shipment Management Dialog Component', () => {
        let comp: ShipmentDialogComponent;
        let fixture: ComponentFixture<ShipmentDialogComponent>;
        let service: ShipmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShipmentDialogComponent],
                providers: [
                    InvoiceService,
                    ShipmentService
                ]
            })
            .overrideTemplate(ShipmentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShipmentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShipmentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Shipment(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.shipment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'shipmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Shipment();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.shipment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'shipmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
