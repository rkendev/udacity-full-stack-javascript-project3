import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonFileLocation = '../../../assets/data.json';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonFileLocation);
  }
}
