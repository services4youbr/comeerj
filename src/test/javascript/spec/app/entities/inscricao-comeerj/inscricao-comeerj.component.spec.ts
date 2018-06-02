/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { InscricaoComeerjComponent } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.component';
import { InscricaoComeerjService } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.service';
import { InscricaoComeerj } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.model';

describe('Component Tests', () => {

    describe('InscricaoComeerj Management Component', () => {
        let comp: InscricaoComeerjComponent;
        let fixture: ComponentFixture<InscricaoComeerjComponent>;
        let service: InscricaoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [InscricaoComeerjComponent],
                providers: [
                    InscricaoComeerjService
                ]
            })
            .overrideTemplate(InscricaoComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscricaoComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InscricaoComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inscricaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
