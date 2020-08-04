import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Shipment } from './shipment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Shipment>;

@Injectable()
export class ShipmentService {

    private resourceUrl =  SERVER_API_URL + 'api/shipments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(shipment: Shipment): Observable<EntityResponseType> {
        const copy = this.convert(shipment);
        return this.http.post<Shipment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shipment: Shipment): Observable<EntityResponseType> {
        const copy = this.convert(shipment);
        return this.http.put<Shipment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Shipment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Shipment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shipment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Shipment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Shipment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Shipment[]>): HttpResponse<Shipment[]> {
        const jsonResponse: Shipment[] = res.body;
        const body: Shipment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Shipment.
     */
    private convertItemFromServer(shipment: Shipment): Shipment {
        const copy: Shipment = Object.assign({}, shipment);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(shipment.date);
        return copy;
    }

    /**
     * Convert a Shipment to a JSON which can be sent to the server.
     */
    private convert(shipment: Shipment): Shipment {
        const copy: Shipment = Object.assign({}, shipment);

        copy.date = this.dateUtils.toDate(shipment.date);
        return copy;
    }
}
