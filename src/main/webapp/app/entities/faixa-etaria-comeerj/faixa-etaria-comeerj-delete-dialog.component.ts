import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FaixaEtariaComeerj } from './faixa-etaria-comeerj.model';
import { FaixaEtariaComeerjPopupService } from './faixa-etaria-comeerj-popup.service';
import { FaixaEtariaComeerjService } from './faixa-etaria-comeerj.service';

@Component({
    selector: 'jhi-faixa-etaria-comeerj-delete-dialog',
    templateUrl: './faixa-etaria-comeerj-delete-dialog.component.html'
})
export class FaixaEtariaComeerjDeleteDialogComponent {

    faixaEtaria: FaixaEtariaComeerj;

    constructor(
        private faixaEtariaService: FaixaEtariaComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.faixaEtariaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'faixaEtariaListModification',
                content: 'Deleted an faixaEtaria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-faixa-etaria-comeerj-delete-popup',
    template: ''
})
export class FaixaEtariaComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private faixaEtariaPopupService: FaixaEtariaComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.faixaEtariaPopupService
                .open(FaixaEtariaComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
