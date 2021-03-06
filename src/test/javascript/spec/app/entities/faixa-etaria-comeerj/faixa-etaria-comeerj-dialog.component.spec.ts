/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { FaixaEtariaComeerjDialogComponent } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj-dialog.component';
import { FaixaEtariaComeerjService } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.service';
import { FaixaEtariaComeerj } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.model';

describe('Component Tests', () => {

    describe('FaixaEtariaComeerj Management Dialog Component', () => {
        let comp: FaixaEtariaComeerjDialogComponent;
        let fixture: ComponentFixture<FaixaEtariaComeerjDialogComponent>;
        let service: FaixaEtariaComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [FaixaEtariaComeerjDialogComponent],
                providers: [
                    FaixaEtariaComeerjService
                ]
            })
            .overrideTemplate(FaixaEtariaComeerjDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaixaEtariaComeerjDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaixaEtariaComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FaixaEtariaComeerj(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.faixaEtaria = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faixaEtariaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FaixaEtariaComeerj();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.faixaEtaria = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faixaEtariaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
