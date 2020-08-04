import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductOrder>;

@Injectable()
export class ProductOrderService {

    private resourceUrl =  SERVER_API_URL + 'api/product-orders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(productOrder: ProductOrder): Observable<EntityResponseType> {
        const copy = this.convert(productOrder);
        return this.http.post<ProductOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productOrder: ProductOrder): Observable<EntityResponseType> {
        const copy = this.convert(productOrder);
        return this.http.put<ProductOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductOrder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductOrder[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductOrder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductOrder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductOrder[]>): HttpResponse<ProductOrder[]> {
        const jsonResponse: ProductOrder[] = res.body;
        const body: ProductOrder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductOrder.
     */
    private convertItemFromServer(productOrder: ProductOrder): ProductOrder {
        const copy: ProductOrder = Object.assign({}, productOrder);
        copy.placedDate = this.dateUtils
            .convertDateTimeFromServer(productOrder.placedDate);
        return copy;
    }

    /**
     * Convert a ProductOrder to a JSON which can be sent to the server.
     */
    private convert(productOrder: ProductOrder): ProductOrder {
        const copy: ProductOrder = Object.assign({}, productOrder);

        copy.placedDate = this.dateUtils.toDate(productOrder.placedDate);
        return copy;
    }
}
