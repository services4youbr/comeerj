/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { PoloComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj-detail.component';
import { PoloComeerjService } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.service';
import { PoloComeerj } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.model';

describe('Component Tests', () => {

    describe('PoloComeerj Management Detail Component', () => {
        let comp: PoloComeerjDetailComponent;
        let fixture: ComponentFixture<PoloComeerjDetailComponent>;
        let service: PoloComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [PoloComeerjDetailComponent],
                providers: [
                    PoloComeerjService
                ]
            })
            .overrideTemplate(PoloComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoloComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoloComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PoloComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.polo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
