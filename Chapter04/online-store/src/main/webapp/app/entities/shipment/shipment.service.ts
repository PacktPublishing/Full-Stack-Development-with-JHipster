import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Shipment } from './shipment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ShipmentService {

    private resourceUrl =  SERVER_API_URL + 'api/shipments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(shipment: Shipment): Observable<Shipment> {
        const copy = this.convert(shipment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(shipment: Shipment): Observable<Shipment> {
        const copy = this.convert(shipment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Shipment> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Shipment.
     */
    private convertItemFromServer(json: any): Shipment {
        const entity: Shipment = Object.assign(new Shipment(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
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
