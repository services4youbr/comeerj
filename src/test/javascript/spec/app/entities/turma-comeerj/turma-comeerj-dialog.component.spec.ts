/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { TurmaComeerjDialogComponent } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj-dialog.component';
import { TurmaComeerjService } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.service';
import { TurmaComeerj } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.model';
import { FaixaEtariaComeerjService } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj';

describe('Component Tests', () => {

    describe('TurmaComeerj Management Dialog Component', () => {
        let comp: TurmaComeerjDialogComponent;
        let fixture: ComponentFixture<TurmaComeerjDialogComponent>;
        let service: TurmaComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [TurmaComeerjDialogComponent],
                providers: [
                    FaixaEtariaComeerjService,
                    TurmaComeerjService
                ]
            })
            .overrideTemplate(TurmaComeerjDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaComeerjDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TurmaComeerj(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.turma = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turmaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TurmaComeerj();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.turma = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turmaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
