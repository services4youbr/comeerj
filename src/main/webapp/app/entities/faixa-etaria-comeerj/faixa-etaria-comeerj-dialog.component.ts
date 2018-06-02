import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FaixaEtariaComeerj } from './faixa-etaria-comeerj.model';
import { FaixaEtariaComeerjPopupService } from './faixa-etaria-comeerj-popup.service';
import { FaixaEtariaComeerjService } from './faixa-etaria-comeerj.service';

@Component({
    selector: 'jhi-faixa-etaria-comeerj-dialog',
    templateUrl: './faixa-etaria-comeerj-dialog.component.html'
})
export class FaixaEtariaComeerjDialogComponent implements OnInit {

    faixaEtaria: FaixaEtariaComeerj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private faixaEtariaService: FaixaEtariaComeerjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.faixaEtaria.id !== undefined) {
            this.subscribeToSaveResponse(
                this.faixaEtariaService.update(this.faixaEtaria));
        } else {
            this.subscribeToSaveResponse(
                this.faixaEtariaService.create(this.faixaEtaria));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FaixaEtariaComeerj>>) {
        result.subscribe((res: HttpResponse<FaixaEtariaComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FaixaEtariaComeerj) {
        this.eventManager.broadcast({ name: 'faixaEtariaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-faixa-etaria-comeerj-popup',
    template: ''
})
export class FaixaEtariaComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private faixaEtariaPopupService: FaixaEtariaComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.faixaEtariaPopupService
                    .open(FaixaEtariaComeerjDialogComponent as Component, params['id']);
            } else {
                this.faixaEtariaPopupService
                    .open(FaixaEtariaComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
