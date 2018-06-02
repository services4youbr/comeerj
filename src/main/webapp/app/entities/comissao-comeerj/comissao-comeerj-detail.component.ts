import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComissaoComeerj } from './comissao-comeerj.model';
import { ComissaoComeerjService } from './comissao-comeerj.service';

@Component({
    selector: 'jhi-comissao-comeerj-detail',
    templateUrl: './comissao-comeerj-detail.component.html'
})
export class ComissaoComeerjDetailComponent implements OnInit, OnDestroy {

    comissao: ComissaoComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private comissaoService: ComissaoComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComissaos();
    }

    load(id) {
        this.comissaoService.find(id)
            .subscribe((comissaoResponse: HttpResponse<ComissaoComeerj>) => {
                this.comissao = comissaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComissaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'comissaoListModification',
            (response) => this.load(this.comissao.id)
        );
    }
}
