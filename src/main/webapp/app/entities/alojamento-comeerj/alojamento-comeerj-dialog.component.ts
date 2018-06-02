import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlojamentoComeerj } from './alojamento-comeerj.model';
import { AlojamentoComeerjPopupService } from './alojamento-comeerj-popup.service';
import { AlojamentoComeerjService } from './alojamento-comeerj.service';
import { InscricaoComeerj, InscricaoComeerjService } from '../inscricao-comeerj';

@Component({
    selector: 'jhi-alojamento-comeerj-dialog',
    templateUrl: './alojamento-comeerj-dialog.component.html'
})
export class AlojamentoComeerjDialogComponent implements OnInit {

    alojamento: AlojamentoComeerj;
    isSaving: boolean;

    responsavels: InscricaoComeerj[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alojamentoService: AlojamentoComeerjService,
        private inscricaoService: InscricaoComeerjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.inscricaoService
            .query({filter: 'alojamentoresponsavel-is-null'})
            .subscribe((res: HttpResponse<InscricaoComeerj[]>) => {
                if (!this.alojamento.responsavelId) {
                    this.responsavels = res.body;
                } else {
                    this.inscricaoService
                        .find(this.alojamento.responsavelId)
                        .subscribe((subRes: HttpResponse<InscricaoComeerj>) => {
                            this.responsavels = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alojamento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alojamentoService.update(this.alojamento));
        } else {
            this.subscribeToSaveResponse(
                this.alojamentoService.create(this.alojamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlojamentoComeerj>>) {
        result.subscribe((res: HttpResponse<AlojamentoComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AlojamentoComeerj) {
        this.eventManager.broadcast({ name: 'alojamentoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInscricaoById(index: number, item: InscricaoComeerj) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-alojamento-comeerj-popup',
    template: ''
})
export class AlojamentoComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alojamentoPopupService: AlojamentoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alojamentoPopupService
                    .open(AlojamentoComeerjDialogComponent as Component, params['id']);
            } else {
                this.alojamentoPopupService
                    .open(AlojamentoComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
