import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InscricaoComeerj } from './inscricao-comeerj.model';
import { InscricaoComeerjPopupService } from './inscricao-comeerj-popup.service';
import { InscricaoComeerjService } from './inscricao-comeerj.service';

@Component({
    selector: 'jhi-inscricao-comeerj-delete-dialog',
    templateUrl: './inscricao-comeerj-delete-dialog.component.html'
})
export class InscricaoComeerjDeleteDialogComponent {

    inscricao: InscricaoComeerj;

    constructor(
        private inscricaoService: InscricaoComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscricaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inscricaoListModification',
                content: 'Deleted an inscricao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscricao-comeerj-delete-popup',
    template: ''
})
export class InscricaoComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscricaoPopupService: InscricaoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inscricaoPopupService
                .open(InscricaoComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
