import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShareDataServiceService {
  private addAnimalsFormSource = new BehaviorSubject<boolean>(false);
  addAnimalsForm$ = this.addAnimalsFormSource.asObservable();

  private answerApiFromSource = new BehaviorSubject<boolean>(false);
  answerApi$ = this.answerApiFromSource.asObservable();

  private postcode = new BehaviorSubject<number>(0);
  postcode$ = this.postcode.asObservable();


  constructor() {}

  addAnnonce() {
    this.addAnimalsFormSource.next(!this.addAnimalsFormSource.getValue());
  }
  
  showAnswer(){
    this.answerApiFromSource.next(!this.answerApiFromSource.getValue());
  }

  getPostcode() {
    this.postcode.next(this.postcode.getValue());
  }

}