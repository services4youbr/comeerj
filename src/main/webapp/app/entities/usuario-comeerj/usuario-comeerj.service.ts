import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UsuarioComeerj } from './usuario-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UsuarioComeerj>;

@Injectable()
export class UsuarioComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/usuarios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/usuarios';

    constructor(private http: HttpClient) { }

    create(usuario: UsuarioComeerj): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.post<UsuarioComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(usuario: UsuarioComeerj): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.put<UsuarioComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UsuarioComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UsuarioComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsuarioComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UsuarioComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<UsuarioComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsuarioComeerj[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UsuarioComeerj[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UsuarioComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UsuarioComeerj[]>): HttpResponse<UsuarioComeerj[]> {
        const jsonResponse: UsuarioComeerj[] = res.body;
        const body: UsuarioComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UsuarioComeerj.
     */
    private convertItemFromServer(usuario: UsuarioComeerj): UsuarioComeerj {
        const copy: UsuarioComeerj = Object.assign({}, usuario);
        return copy;
    }

    /**
     * Convert a UsuarioComeerj to a JSON which can be sent to the server.
     */
    private convert(usuario: UsuarioComeerj): UsuarioComeerj {
        const copy: UsuarioComeerj = Object.assign({}, usuario);
        return copy;
    }
}
