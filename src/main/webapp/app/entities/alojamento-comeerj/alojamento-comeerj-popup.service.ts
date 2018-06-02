import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AlojamentoComeerj } from './alojamento-comeerj.model';
import { AlojamentoComeerjService } from './alojamento-comeerj.service';

@Injectable()
export class AlojamentoComeerjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private alojamentoService: AlojamentoComeerjService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alojamentoService.find(id)
                    .subscribe((alojamentoResponse: HttpResponse<AlojamentoComeerj>) => {
                        const alojamento: AlojamentoComeerj = alojamentoResponse.body;
                        this.ngbModalRef = this.alojamentoModalRef(component, alojamento);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alojamentoModalRef(component, new AlojamentoComeerj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alojamentoModalRef(component: Component, alojamento: AlojamentoComeerj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.alojamento = alojamento;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
