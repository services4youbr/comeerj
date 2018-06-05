import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FaixaEtariaComeerj } from './faixa-etaria-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FaixaEtariaComeerj>;

@Injectable()
export class FaixaEtariaComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/faixa-etarias';

    constructor(private http: HttpClient) { }

    create(faixaEtaria: FaixaEtariaComeerj): Observable<EntityResponseType> {
        const copy = this.convert(faixaEtaria);
        return this.http.post<FaixaEtariaComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(faixaEtaria: FaixaEtariaComeerj): Observable<EntityResponseType> {
        const copy = this.convert(faixaEtaria);
        return this.http.put<FaixaEtariaComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FaixaEtariaComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FaixaEtariaComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<FaixaEtariaComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FaixaEtariaComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FaixaEtariaComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FaixaEtariaComeerj[]>): HttpResponse<FaixaEtariaComeerj[]> {
        const jsonResponse: FaixaEtariaComeerj[] = res.body;
        const body: FaixaEtariaComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FaixaEtariaComeerj.
     */
    private convertItemFromServer(faixaEtaria: FaixaEtariaComeerj): FaixaEtariaComeerj {
        const copy: FaixaEtariaComeerj = Object.assign({}, faixaEtaria);
        return copy;
    }

    /**
     * Convert a FaixaEtariaComeerj to a JSON which can be sent to the server.
     */
    private convert(faixaEtaria: FaixaEtariaComeerj): FaixaEtariaComeerj {
        const copy: FaixaEtariaComeerj = Object.assign({}, faixaEtaria);
        return copy;
    }
}
