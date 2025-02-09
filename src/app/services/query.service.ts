import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryFilter } from '../models/query-filter.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private filterSubject = new BehaviorSubject<QueryFilter>({});
  queryFilter$ = this.filterSubject.asObservable();

  setQueryFilter(filter: QueryFilter): void {
    this.filterSubject.next(filter);
  }
}
