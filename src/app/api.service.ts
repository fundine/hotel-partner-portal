import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private unitId = environment.unitId;
  private partnerId = environment.partnerId;
  private userId = environment.userId;

  constructor(private http: HttpClient) { }

  // general : countries, food item type, gender
  getAllCountries(): Observable<any> {
    const url = `${this.apiUrl}/countries`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getItemTypeData(): Observable<any> {
    const url = `${this.apiUrl}/itemtype`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getGenders(): Observable<any> {
    const url = `${this.apiUrl}/genders`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getUserStatus(): Observable<any> {
    const url = `${this.apiUrl}/userstatus`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getIdentifiableDocument(): Observable<any> {
    const url = `${this.apiUrl}/identifiabledocument`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getMaritalStatus(): Observable<any> {
    const url = `${this.apiUrl}/maritalstatus`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };


  // outlets :  allowed outlets, assigned unit list for users, disable outlet
  getUnitListData(categoryTypeId: string): Observable<any> {
    const url = `${this.apiUrl}/categorytypeunits/${categoryTypeId}`;
    const requestOptions = {
      headers: {
        'userId': this.userId,
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getUnitsList(): Observable<any> {
    const url = `${this.apiUrl}/userunits`;
    const requestOptions = {
      headers: {
        'userId': this.userId,
        'partnerId': this.partnerId,
      }
    };
    return this.http.get(url, requestOptions);
  };
  changeUnitStatus(unitId: string, isUnitOpen: boolean): Observable<any> {
    const url = `${this.apiUrl}/unit/update/status/${unitId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    const requestBody = { isUnitOpen };
    return this.http.put(url, requestBody, requestOptions);
  }


  // category : subcategory list, category & subcategory save
  getItemCategoryData(categoryTypeId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/${categoryTypeId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  getCategoryData(activeCategory: any): Observable<any> {
    const url = `${this.apiUrl}/itemcategory-subcategory/${activeCategory}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  saveCategory(formBody: any) {
    const url = `${this.apiUrl}/itemcategory/create`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.post(url, body, requestOptions);
  };
  editCategory(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/itemcategory/update/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.put(url, body, requestOptions);
  };
  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/delete/${categoryId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.delete(url, requestOptions);
  };


  // subcategory : subcategory list, category & subcategory save
  getItemSubCategoryData(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory`;

    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  saveSubCategory(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory/create`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
      }
    };
    return this.http.post(url, body, requestOptions);
  };
  editSubCategory(formBody: any, categoryId: string, subCategoryId: string) {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory/update/${subCategoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.put(url, body, requestOptions);
  };
  deleteSubCategory(categoryId: string, subCategoryId: string): Observable<any> {
    const url = `${this.apiUrl}/itemcategory/${categoryId}/itemsubcategory/delete/${subCategoryId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.delete(url, requestOptions);
  };


  // feature group : menu items list, feature group list, feature group save, feature group edit, feature group delete
  getCategoryMenuItems(categoryTypeId: string, unitId: any): Observable<any> {
    const url = `${this.apiUrl}/item/${categoryTypeId}/${unitId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
      }
    };
    return this.http.get(url, requestOptions);
  };
  getFeatureGroupData(categoryTypeId: string): Observable<any> {
    const url = `${this.apiUrl}/itemgroup/${categoryTypeId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.get(url, requestOptions);
  };
  saveFeatureGroup(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/itemgroup/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.post(url, body, requestOptions);
  };
  editFeatureGroup(formBody: any, groupId: string) {
    const url = `${this.apiUrl}/itemgroup/update/${groupId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.put(url, body, requestOptions);
  };
  deleteFeatureGroup(groupId: string): Observable<any> {
    const url = `${this.apiUrl}/itemgroup/delete/${groupId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.delete(url, requestOptions);
  };

  
  // menu editor : unit wise menu tree structure, quick add save, batch entry save, make outofstock menu item
  getUnitMenuData(unitId: any): Observable<any> {
    const url = `${this.apiUrl}/menumanagement/${unitId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.get(url, requestOptions);
  };
  saveMenuItem(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/item/create/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId
      }
    };
    return this.http.post(url, body, requestOptions);
  };
  saveBatchItem(formBody: any, categoryId: string) {
    const url = `${this.apiUrl}/item/create/batch/${categoryId}`;
    const body = formBody;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
      }
    };
    return this.http.post(url, body, requestOptions);
  };
  deleteMenuItem(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/item/delete/${itemId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.delete(url, requestOptions);
  };
  changeMenuItemStatus(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/item/update/status/${itemId}`;
    const requestOptions = {
      headers: {
        'partnerId': this.partnerId,
        'unitId': this.unitId,
      }
    };
    return this.http.put(url, requestOptions);
  };
}

// 412 missing in category sub category delete
