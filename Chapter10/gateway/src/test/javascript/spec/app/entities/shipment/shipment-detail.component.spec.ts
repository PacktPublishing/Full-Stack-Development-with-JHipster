/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ShipmentDetailComponent } from '../../../../../../main/webapp/app/entities/shipment/shipment-detail.component';
import { ShipmentService } from '../../../../../../main/webapp/app/entities/shipment/shipment.service';
import { Shipment } from '../../../../../../main/webapp/app/entities/shipment/shipment.model';

describe('Component Tests', () => {

    describe('Shipment Management Detail Component', () => {
        let comp: ShipmentDetailComponent;
        let fixture: ComponentFixture<ShipmentDetailComponent>;
        let service: ShipmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ShipmentDetailComponent],
                providers: [
                    ShipmentService
                ]
            })
            .overrideTemplate(ShipmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ShipmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShipmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Shipment(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.shipment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
