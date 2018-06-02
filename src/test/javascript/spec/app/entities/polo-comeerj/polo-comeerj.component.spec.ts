/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { PoloComeerjComponent } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.component';
import { PoloComeerjService } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.service';
import { PoloComeerj } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.model';

describe('Component Tests', () => {

    describe('PoloComeerj Management Component', () => {
        let comp: PoloComeerjComponent;
        let fixture: ComponentFixture<PoloComeerjComponent>;
        let service: PoloComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [PoloComeerjComponent],
                providers: [
                    PoloComeerjService
                ]
            })
            .overrideTemplate(PoloComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoloComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoloComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PoloComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.polos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
