/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { EventoComeerjComponent } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj.component';
import { EventoComeerjService } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj.service';
import { EventoComeerj } from '../../../../../../main/webapp/app/entities/evento-comeerj/evento-comeerj.model';

describe('Component Tests', () => {

    describe('EventoComeerj Management Component', () => {
        let comp: EventoComeerjComponent;
        let fixture: ComponentFixture<EventoComeerjComponent>;
        let service: EventoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [EventoComeerjComponent],
                providers: [
                    EventoComeerjService
                ]
            })
            .overrideTemplate(EventoComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventoComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EventoComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eventos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
