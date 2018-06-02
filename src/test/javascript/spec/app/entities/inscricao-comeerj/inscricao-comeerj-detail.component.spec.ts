/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { InscricaoComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj-detail.component';
import { InscricaoComeerjService } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.service';
import { InscricaoComeerj } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.model';

describe('Component Tests', () => {

    describe('InscricaoComeerj Management Detail Component', () => {
        let comp: InscricaoComeerjDetailComponent;
        let fixture: ComponentFixture<InscricaoComeerjDetailComponent>;
        let service: InscricaoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [InscricaoComeerjDetailComponent],
                providers: [
                    InscricaoComeerjService
                ]
            })
            .overrideTemplate(InscricaoComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscricaoComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InscricaoComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inscricao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
