/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { AlojamentoComeerjComponent } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.component';
import { AlojamentoComeerjService } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.service';
import { AlojamentoComeerj } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.model';

describe('Component Tests', () => {

    describe('AlojamentoComeerj Management Component', () => {
        let comp: AlojamentoComeerjComponent;
        let fixture: ComponentFixture<AlojamentoComeerjComponent>;
        let service: AlojamentoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [AlojamentoComeerjComponent],
                providers: [
                    AlojamentoComeerjService
                ]
            })
            .overrideTemplate(AlojamentoComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlojamentoComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlojamentoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AlojamentoComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alojamentos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
