import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FaixaEtariaComeerj } from './faixa-etaria-comeerj.model';
import { FaixaEtariaComeerjService } from './faixa-etaria-comeerj.service';

@Component({
    selector: 'jhi-faixa-etaria-comeerj-detail',
    templateUrl: './faixa-etaria-comeerj-detail.component.html'
})
export class FaixaEtariaComeerjDetailComponent implements OnInit, OnDestroy {

    faixaEtaria: FaixaEtariaComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private faixaEtariaService: FaixaEtariaComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFaixaEtarias();
    }

    load(id) {
        this.faixaEtariaService.find(id)
            .subscribe((faixaEtariaResponse: HttpResponse<FaixaEtariaComeerj>) => {
                this.faixaEtaria = faixaEtariaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFaixaEtarias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'faixaEtariaListModification',
            (response) => this.load(this.faixaEtaria.id)
        );
    }
}
