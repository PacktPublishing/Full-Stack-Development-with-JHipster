/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GatewayTestModule } from '../../../test.module';
import { NotificationComponent } from '../../../../../../main/webapp/app/entities/notification/notification.component';
import { NotificationService } from '../../../../../../main/webapp/app/entities/notification/notification.service';
import { Notification } from '../../../../../../main/webapp/app/entities/notification/notification.model';

describe('Component Tests', () => {

    describe('Notification Management Component', () => {
        let comp: NotificationComponent;
        let fixture: ComponentFixture<NotificationComponent>;
        let service: NotificationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationComponent],
                providers: [
                    NotificationService
                ]
            })
            .overrideTemplate(NotificationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Notification(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
