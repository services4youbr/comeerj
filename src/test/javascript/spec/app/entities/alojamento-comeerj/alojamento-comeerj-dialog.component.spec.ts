/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { AlojamentoComeerjDialogComponent } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj-dialog.component';
import { AlojamentoComeerjService } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.service';
import { AlojamentoComeerj } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.model';
import { InscricaoComeerjService } from '../../../../../../main/webapp/app/entities/inscricao-comeerj';

describe('Component Tests', () => {

    describe('AlojamentoComeerj Management Dialog Component', () => {
        let comp: AlojamentoComeerjDialogComponent;
        let fixture: ComponentFixture<AlojamentoComeerjDialogComponent>;
        let service: AlojamentoComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [AlojamentoComeerjDialogComponent],
                providers: [
                    InscricaoComeerjService,
                    AlojamentoComeerjService
                ]
            })
            .overrideTemplate(AlojamentoComeerjDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlojamentoComeerjDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlojamentoComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlojamentoComeerj(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.alojamento = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'alojamentoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlojamentoComeerj();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.alojamento = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'alojamentoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
