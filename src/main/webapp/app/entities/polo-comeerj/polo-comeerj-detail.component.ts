import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PoloComeerj } from './polo-comeerj.model';
import { PoloComeerjService } from './polo-comeerj.service';

@Component({
    selector: 'jhi-polo-comeerj-detail',
    templateUrl: './polo-comeerj-detail.component.html'
})
export class PoloComeerjDetailComponent implements OnInit, OnDestroy {

    polo: PoloComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private poloService: PoloComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPolos();
    }

    load(id) {
        this.poloService.find(id)
            .subscribe((poloResponse: HttpResponse<PoloComeerj>) => {
                this.polo = poloResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPolos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'poloListModification',
            (response) => this.load(this.polo.id)
        );
    }
}
