import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ComissaoComeerj } from './comissao-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComissaoComeerj>;

@Injectable()
export class ComissaoComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/comissaos';

    constructor(private http: HttpClient) { }

    create(comissao: ComissaoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(comissao);
        return this.http.post<ComissaoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comissao: ComissaoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(comissao);
        return this.http.put<ComissaoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComissaoComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComissaoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComissaoComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComissaoComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComissaoComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComissaoComeerj[]>): HttpResponse<ComissaoComeerj[]> {
        const jsonResponse: ComissaoComeerj[] = res.body;
        const body: ComissaoComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComissaoComeerj.
     */
    private convertItemFromServer(comissao: ComissaoComeerj): ComissaoComeerj {
        const copy: ComissaoComeerj = Object.assign({}, comissao);
        return copy;
    }

    /**
     * Convert a ComissaoComeerj to a JSON which can be sent to the server.
     */
    private convert(comissao: ComissaoComeerj): ComissaoComeerj {
        const copy: ComissaoComeerj = Object.assign({}, comissao);
        return copy;
    }
}
