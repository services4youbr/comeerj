import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FaixaEtariaComeerj } from './faixa-etaria-comeerj.model';
import { FaixaEtariaComeerjService } from './faixa-etaria-comeerj.service';

@Injectable()
export class FaixaEtariaComeerjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private faixaEtariaService: FaixaEtariaComeerjService

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
                this.faixaEtariaService.find(id)
                    .subscribe((faixaEtariaResponse: HttpResponse<FaixaEtariaComeerj>) => {
                        const faixaEtaria: FaixaEtariaComeerj = faixaEtariaResponse.body;
                        this.ngbModalRef = this.faixaEtariaModalRef(component, faixaEtaria);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.faixaEtariaModalRef(component, new FaixaEtariaComeerj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    faixaEtariaModalRef(component: Component, faixaEtaria: FaixaEtariaComeerj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.faixaEtaria = faixaEtaria;
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
