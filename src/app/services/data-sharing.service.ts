import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  listOfItems = new BehaviorSubject<any[]>([]);
  asListObserver = this.listOfItems.asObservable();

  isDBCreated = new BehaviorSubject<boolean>(false);
  isDBObserver = this.isDBCreated.asObservable();

  setList(msg:any)
  {
    this.listOfItems.next(msg);
  }

  setIsDBCreated(msg:any)
  {
    this.isDBCreated.next(msg);
  }

  constructor() { }
}
