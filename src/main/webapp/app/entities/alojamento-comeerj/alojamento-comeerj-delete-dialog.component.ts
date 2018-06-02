import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlojamentoComeerj } from './alojamento-comeerj.model';
import { AlojamentoComeerjPopupService } from './alojamento-comeerj-popup.service';
import { AlojamentoComeerjService } from './alojamento-comeerj.service';

@Component({
    selector: 'jhi-alojamento-comeerj-delete-dialog',
    templateUrl: './alojamento-comeerj-delete-dialog.component.html'
})
export class AlojamentoComeerjDeleteDialogComponent {

    alojamento: AlojamentoComeerj;

    constructor(
        private alojamentoService: AlojamentoComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alojamentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alojamentoListModification',
                content: 'Deleted an alojamento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alojamento-comeerj-delete-popup',
    template: ''
})
export class AlojamentoComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alojamentoPopupService: AlojamentoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alojamentoPopupService
                .open(AlojamentoComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
