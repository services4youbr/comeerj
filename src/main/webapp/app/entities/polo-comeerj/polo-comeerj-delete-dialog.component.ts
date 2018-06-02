import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PoloComeerj } from './polo-comeerj.model';
import { PoloComeerjPopupService } from './polo-comeerj-popup.service';
import { PoloComeerjService } from './polo-comeerj.service';

@Component({
    selector: 'jhi-polo-comeerj-delete-dialog',
    templateUrl: './polo-comeerj-delete-dialog.component.html'
})
export class PoloComeerjDeleteDialogComponent {

    polo: PoloComeerj;

    constructor(
        private poloService: PoloComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.poloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'poloListModification',
                content: 'Deleted an polo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-polo-comeerj-delete-popup',
    template: ''
})
export class PoloComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private poloPopupService: PoloComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.poloPopupService
                .open(PoloComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
