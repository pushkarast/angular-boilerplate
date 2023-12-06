import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SpinnerService {
  isLoading: Subject<boolean>;
  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  getStateAsObservable(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
  setState(state: boolean=false) {
    this.isLoading.next(state);
  }
}
