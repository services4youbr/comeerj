/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { PoloComeerjDialogComponent } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj-dialog.component';
import { PoloComeerjService } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.service';
import { PoloComeerj } from '../../../../../../main/webapp/app/entities/polo-comeerj/polo-comeerj.model';

describe('Component Tests', () => {

    describe('PoloComeerj Management Dialog Component', () => {
        let comp: PoloComeerjDialogComponent;
        let fixture: ComponentFixture<PoloComeerjDialogComponent>;
        let service: PoloComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [PoloComeerjDialogComponent],
                providers: [
                    PoloComeerjService
                ]
            })
            .overrideTemplate(PoloComeerjDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PoloComeerjDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoloComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PoloComeerj(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.polo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'poloListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PoloComeerj();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.polo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'poloListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
