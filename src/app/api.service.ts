import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private restaurantId = environment.restaurantId;
  private unitId = environment.unitId;
  private partnerId = environment.partnerId;
  private userId = environment.userId;

  constructor(private http: HttpClient) { }

  // category control, subcategory control, itemtype control
  getItemCategoryData(categoryTypeId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/${categoryTypeId}`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getItemSubCategoryData(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory`;

    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getItemTypeData(): Observable<any> {
    const url = `${this.apiUrl}/itemtype`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getUnitListData(): Observable<any> {
    const url = `${this.apiUrl}/categorytypeunits/1`;
    const requestOptions = {
      headers: {
        'userId': this.userId,
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  }

  // category, subcategory management list
  getRestaurantCategoryData(): Observable<any> {
    const url = `${this.apiUrl}/itemcategory-subcategory/1`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getBarCategoryData(): Observable<any> {
    const url = `${this.apiUrl}/itemcategory-subcategory/2`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getLaundryCategoryData(): Observable<any> {
    const url = `${this.apiUrl}/itemcategory-subcategory/4`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getSpaCategoryData(): Observable<any> {
    const url = `${this.apiUrl}/itemcategory-subcategory/5`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }

  // category, subcategory save
  saveCategory(formBody: any) {
    const url = `${this.apiUrl}/itemcategory/create`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.post(url, body, requestOptions);
  }
  saveSubCategory(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory/create`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.post(url, body, requestOptions);
  }

  // restauarant, bar menu tree structure
  getRestaurantMenuData(): Observable<any> {
    const url = `${this.apiUrl}/menumanagement/RBTSzuOXgJ9mqXlclBaf/1`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }
  getBarMenuData(): Observable<any> {
    const url = `${this.apiUrl}/menumanagement/RBTSzuOXgJ9mqXlclBaf/2`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId
      }
    };
    return this.http.get(url, requestOptions);
  }

  // restauarant, bar menu items
  getRestaurantMenuItems(): Observable<any> {
    const url = `${this.apiUrl}/item/1`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.get(url, requestOptions);
  }
  getBarMenuItems(): Observable<any> {
    const url = `${this.apiUrl}/item/2`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.get(url, requestOptions);
  }

  // restauarant, bar menu items save 
  saveMenuItem(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/item/create/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.post(url, body, requestOptions);
  }
  saveBatchItem(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/item/create/batch/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.post(url, body, requestOptions);
  }

  // restauarant, bar feature group list
  getRestaurantFeatureGroup(): Observable<any> {
    const url = `${this.apiUrl}/itemgroup/1`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.get(url, requestOptions);
  }
  getBarFeatureGroup(): Observable<any> {
    const url = `${this.apiUrl}/itemgroup/2`;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.get(url, requestOptions);
  }

  // restauarant, bar feature group save 
  saveFeatureGroup(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/itemgroup/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'restaurantId': this.restaurantId,
        'unitId': this.unitId,
      }
    };
    return this.http.post(url, body, requestOptions);
  }


  getUnitsList(): Observable<any> {
    const url = `${this.apiUrl}/userunits`;
    const requestOptions = {
      headers: {
        'userId': this.userId,
        'partnerId': this.partnerId

      }
    };
    return this.http.get(url, requestOptions);
  }
}


