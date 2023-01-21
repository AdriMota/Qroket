import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShareDataServiceService {
  private addAnimalsFormSource = new BehaviorSubject<boolean>(false);
  addAnimalsForm$ = this.addAnimalsFormSource.asObservable();

  constructor() {}

  toggleAddAnimalsForm(value: boolean) {
    this.addAnimalsFormSource.next(value);
  }
  changeVisibility() {
    this.addAnimalsFormSource.next(!this.addAnimalsFormSource.getValue());
  }
}