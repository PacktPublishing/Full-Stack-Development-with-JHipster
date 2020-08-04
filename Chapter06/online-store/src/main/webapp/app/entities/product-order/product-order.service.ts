import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ProductOrder } from './product-order.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProductOrderService {

    private resourceUrl =  SERVER_API_URL + 'api/product-orders';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(productOrder: ProductOrder): Observable<ProductOrder> {
        const copy = this.convert(productOrder);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(productOrder: ProductOrder): Observable<ProductOrder> {
        const copy = this.convert(productOrder);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProductOrder> {
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
     * Convert a returned JSON object to ProductOrder.
     */
    private convertItemFromServer(json: any): ProductOrder {
        const entity: ProductOrder = Object.assign(new ProductOrder(), json);
        entity.placedDate = this.dateUtils
            .convertDateTimeFromServer(json.placedDate);
        return entity;
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
