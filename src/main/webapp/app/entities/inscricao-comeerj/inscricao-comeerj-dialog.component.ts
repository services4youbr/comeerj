import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InscricaoComeerj } from './inscricao-comeerj.model';
import { InscricaoComeerjPopupService } from './inscricao-comeerj-popup.service';
import { InscricaoComeerjService } from './inscricao-comeerj.service';
import { AlojamentoComeerj, AlojamentoComeerjService } from '../alojamento-comeerj';
import { PoloComeerj, PoloComeerjService } from '../polo-comeerj';
import { EventoComeerj, EventoComeerjService } from '../evento-comeerj';
import { ComissaoComeerj, ComissaoComeerjService } from '../comissao-comeerj';
import { UsuarioComeerj, UsuarioComeerjService } from '../usuario-comeerj';
import { TurmaComeerj, TurmaComeerjService } from '../turma-comeerj';

@Component({
    selector: 'jhi-inscricao-comeerj-dialog',
    templateUrl: './inscricao-comeerj-dialog.component.html'
})
export class InscricaoComeerjDialogComponent implements OnInit {

    inscricao: InscricaoComeerj;
    isSaving: boolean;

    alojamentos: AlojamentoComeerj[];

    polos: PoloComeerj[];

    eventos: EventoComeerj[];

    comissaos: ComissaoComeerj[];

    usuarios: UsuarioComeerj[];

    turmas: TurmaComeerj[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inscricaoService: InscricaoComeerjService,
        private alojamentoService: AlojamentoComeerjService,
        private poloService: PoloComeerjService,
        private eventoService: EventoComeerjService,
        private comissaoService: ComissaoComeerjService,
        private usuarioService: UsuarioComeerjService,
        private turmaService: TurmaComeerjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alojamentoService.query()
            .subscribe((res: HttpResponse<AlojamentoComeerj[]>) => { this.alojamentos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.poloService.query()
            .subscribe((res: HttpResponse<PoloComeerj[]>) => { this.polos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.eventoService.query()
            .subscribe((res: HttpResponse<EventoComeerj[]>) => { this.eventos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.comissaoService.query()
            .subscribe((res: HttpResponse<ComissaoComeerj[]>) => { this.comissaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.usuarioService.query()
            .subscribe((res: HttpResponse<UsuarioComeerj[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.turmaService.query()
            .subscribe((res: HttpResponse<TurmaComeerj[]>) => { this.turmas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inscricao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inscricaoService.update(this.inscricao));
        } else {
            this.subscribeToSaveResponse(
                this.inscricaoService.create(this.inscricao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InscricaoComeerj>>) {
        result.subscribe((res: HttpResponse<InscricaoComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InscricaoComeerj) {
        this.eventManager.broadcast({ name: 'inscricaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlojamentoById(index: number, item: AlojamentoComeerj) {
        return item.id;
    }

    trackPoloById(index: number, item: PoloComeerj) {
        return item.id;
    }

    trackEventoById(index: number, item: EventoComeerj) {
        return item.id;
    }

    trackComissaoById(index: number, item: ComissaoComeerj) {
        return item.id;
    }

    trackUsuarioById(index: number, item: UsuarioComeerj) {
        return item.id;
    }

    trackTurmaById(index: number, item: TurmaComeerj) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inscricao-comeerj-popup',
    template: ''
})
export class InscricaoComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscricaoPopupService: InscricaoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inscricaoPopupService
                    .open(InscricaoComeerjDialogComponent as Component, params['id']);
            } else {
                this.inscricaoPopupService
                    .open(InscricaoComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
