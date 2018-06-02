/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { EventoComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj-detail.component';
import { EventoComeerjService } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj.service';
import { EventoComeerj } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj.model';

describe('Component Tests', () => {

    describe('EventoComeerj Management Detail Component', () => {
        let comp: EventoComeerjDetailComponent;
        let fixture: ComponentFixture<EventoComeerjDetailComponent>;
        let service: EventoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [EventoComeerjDetailComponent],
                providers: [
                    EventoComeerjService
                ]
            })
            .overrideTemplate(EventoComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventoComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EventoComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.evento).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
