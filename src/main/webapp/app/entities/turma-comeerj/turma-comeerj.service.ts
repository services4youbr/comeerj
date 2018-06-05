import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TurmaComeerj } from './turma-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TurmaComeerj>;

@Injectable()
export class TurmaComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/turmas';

    constructor(private http: HttpClient) { }

    create(turma: TurmaComeerj): Observable<EntityResponseType> {
        const copy = this.convert(turma);
        return this.http.post<TurmaComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(turma: TurmaComeerj): Observable<EntityResponseType> {
        const copy = this.convert(turma);
        return this.http.put<TurmaComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TurmaComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TurmaComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<TurmaComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TurmaComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TurmaComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TurmaComeerj[]>): HttpResponse<TurmaComeerj[]> {
        const jsonResponse: TurmaComeerj[] = res.body;
        const body: TurmaComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TurmaComeerj.
     */
    private convertItemFromServer(turma: TurmaComeerj): TurmaComeerj {
        const copy: TurmaComeerj = Object.assign({}, turma);
        return copy;
    }

    /**
     * Convert a TurmaComeerj to a JSON which can be sent to the server.
     */
    private convert(turma: TurmaComeerj): TurmaComeerj {
        const copy: TurmaComeerj = Object.assign({}, turma);
        return copy;
    }
}
