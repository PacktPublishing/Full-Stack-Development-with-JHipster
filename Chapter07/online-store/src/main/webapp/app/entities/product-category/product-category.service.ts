import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductCategory } from './product-category.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductCategory>;

@Injectable()
export class ProductCategoryService {

    private resourceUrl =  SERVER_API_URL + 'api/product-categories';

    constructor(private http: HttpClient) { }

    create(productCategory: ProductCategory): Observable<EntityResponseType> {
        const copy = this.convert(productCategory);
        return this.http.post<ProductCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productCategory: ProductCategory): Observable<EntityResponseType> {
        const copy = this.convert(productCategory);
        return this.http.put<ProductCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductCategory>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductCategory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductCategory = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductCategory[]>): HttpResponse<ProductCategory[]> {
        const jsonResponse: ProductCategory[] = res.body;
        const body: ProductCategory[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductCategory.
     */
    private convertItemFromServer(productCategory: ProductCategory): ProductCategory {
        const copy: ProductCategory = Object.assign({}, productCategory);
        return copy;
    }

    /**
     * Convert a ProductCategory to a JSON which can be sent to the server.
     */
    private convert(productCategory: ProductCategory): ProductCategory {
        const copy: ProductCategory = Object.assign({}, productCategory);
        return copy;
    }
}
