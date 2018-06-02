/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { TurmaComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj-detail.component';
import { TurmaComeerjService } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.service';
import { TurmaComeerj } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.model';

describe('Component Tests', () => {

    describe('TurmaComeerj Management Detail Component', () => {
        let comp: TurmaComeerjDetailComponent;
        let fixture: ComponentFixture<TurmaComeerjDetailComponent>;
        let service: TurmaComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [TurmaComeerjDetailComponent],
                providers: [
                    TurmaComeerjService
                ]
            })
            .overrideTemplate(TurmaComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TurmaComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.turma).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
