import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class SearchService {
  public static handleError(error: any):  Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  constructor(private http: Http) { }
  search(searchVal) {
    return this.http.post('/search', {searchString: searchVal})
      .toPromise().then((res) => res.json())
      .catch(err => SearchService.handleError(err));
  }
}
