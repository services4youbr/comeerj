import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TurmaComeerj } from './turma-comeerj.model';
import { TurmaComeerjPopupService } from './turma-comeerj-popup.service';
import { TurmaComeerjService } from './turma-comeerj.service';
import { FaixaEtariaComeerj, FaixaEtariaComeerjService } from '../faixa-etaria-comeerj';

@Component({
    selector: 'jhi-turma-comeerj-dialog',
    templateUrl: './turma-comeerj-dialog.component.html'
})
export class TurmaComeerjDialogComponent implements OnInit {

    turma: TurmaComeerj;
    isSaving: boolean;

    faixaetarias: FaixaEtariaComeerj[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private turmaService: TurmaComeerjService,
        private faixaEtariaService: FaixaEtariaComeerjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.faixaEtariaService.query()
            .subscribe((res: HttpResponse<FaixaEtariaComeerj[]>) => { this.faixaetarias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.turma.id !== undefined) {
            this.subscribeToSaveResponse(
                this.turmaService.update(this.turma));
        } else {
            this.subscribeToSaveResponse(
                this.turmaService.create(this.turma));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TurmaComeerj>>) {
        result.subscribe((res: HttpResponse<TurmaComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TurmaComeerj) {
        this.eventManager.broadcast({ name: 'turmaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFaixaEtariaById(index: number, item: FaixaEtariaComeerj) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-turma-comeerj-popup',
    template: ''
})
export class TurmaComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turmaPopupService: TurmaComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.turmaPopupService
                    .open(TurmaComeerjDialogComponent as Component, params['id']);
            } else {
                this.turmaPopupService
                    .open(TurmaComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
