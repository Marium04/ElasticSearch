import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products = [];
  showProducts = false;
  waitText = 'Please wait...';
  placeholder = 'Search';
  selectedProduct;
  searchStr: string;
  totalResults = 0;
  protected dataService: CompleterData;
  constructor(private searchService: SearchService, private completerService: CompleterService) {
    const timedRes = Observable.from('/search/').delay(3000);
    this.dataService = completerService.remote('/search/', null , 'Product Name').imageField('Main Image');
  }

  ngOnInit() {
  }
  search(event) {
    this.selectedProduct = null;
    this.searchService.search(this.searchStr).then((data) => {
      this.products = data.data;
      this.showProducts = true;
      this.totalResults = data.total;
    });
  }
  protected onSelected(item: CompleterItem) {
    if ( item && typeof  item['originalObject'] !== 'undefined') {
      this.products = [];
      this.products.push(item['originalObject']);
      this.showProducts = true;
    }
  }
  protected  viewProductDetails(productIndex: number) {
    this.showProducts = false;
    this.selectedProduct = this.products[productIndex];
  }
  protected goBack() {
    this.showProducts = true;
    this.selectedProduct = null;
  }
}


