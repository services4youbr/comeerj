/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { InscricaoComeerjDialogComponent } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj-dialog.component';
import { InscricaoComeerjService } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.service';
import { InscricaoComeerj } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.model';
import { AlojamentoComeerjService } from '../../../../../../main/webapp/app/entities/alojamento-comeerj';
import { PoloComeerjService } from '../../../../../../main/webapp/app/entities/polo-comeerj';
import { EventoComeerjService } from '../../../../../../main/webapp/app/entities/evento-comeerj';
import { ComissaoComeerjService } from '../../../../../../main/webapp/app/entities/comissao-comeerj';
import { UsuarioComeerjService } from '../../../../../../main/webapp/app/entities/usuario-comeerj';
import { TurmaComeerjService } from '../../../../../../main/webapp/app/entities/turma-comeerj';

describe('Component Tests', () => {

    describe('InscricaoComeerj Management Dialog Component', () => {
        let comp: InscricaoComeerjDialogComponent;
        let fixture: ComponentFixture<InscricaoComeerjDialogComponent>;
        let service: InscricaoComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [InscricaoComeerjDialogComponent],
                providers: [
                    AlojamentoComeerjService,
                    PoloComeerjService,
                    EventoComeerjService,
                    ComissaoComeerjService,
                    UsuarioComeerjService,
                    TurmaComeerjService,
                    InscricaoComeerjService
                ]
            })
            .overrideTemplate(InscricaoComeerjDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscricaoComeerjDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InscricaoComeerj(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscricao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscricaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InscricaoComeerj();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscricao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscricaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
