/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { TurmaComeerjComponent } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.component';
import { TurmaComeerjService } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.service';
import { TurmaComeerj } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.model';

describe('Component Tests', () => {

    describe('TurmaComeerj Management Component', () => {
        let comp: TurmaComeerjComponent;
        let fixture: ComponentFixture<TurmaComeerjComponent>;
        let service: TurmaComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [TurmaComeerjComponent],
                providers: [
                    TurmaComeerjService
                ]
            })
            .overrideTemplate(TurmaComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TurmaComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.turmas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
